import {
    PrivacyCenterErrorCode,
    privacyCenterJson,
} from '@/app/api/privacy-center/api-response';
import { parsePrivacyFormBody } from '@/app/api/privacy-center/parse-form';
import { sendTelegramMessage } from '@/helper/telegram';

/**
 * POST /api/privacy-center
 * Body: { "form": { ... } } — các field cho phép xem parse-form.ts (chuỗi/số, giới hạn độ dài).
 */
export async function POST(req: Request) {
    try {
        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return privacyCenterJson(
                {
                    success: false,
                    message: 'Invalid JSON body',
                    error_code: PrivacyCenterErrorCode.INVALID_REQUEST,
                },
                { status: 400 }
            );
        }

        const parsedData = parsePrivacyFormBody(body);
        if (!parsedData) {
            return privacyCenterJson(
                {
                    success: false,
                    message:
                        'Invalid request: expected JSON object { "form": { ... } } with allowed fields only',
                    error_code: PrivacyCenterErrorCode.INVALID_REQUEST,
                },
                { status: 400 }
            );
        }

        const telegramOutcome = await sendTelegramMessage(parsedData);
        if (!telegramOutcome.ok) {
            console.error(
                'Telegram send failed:',
                telegramOutcome.error instanceof Error
                    ? telegramOutcome.error.message
                    : telegramOutcome.error
            );
            return privacyCenterJson({
                success: false,
                message: 'Request received but notification delivery failed',
                error_code: PrivacyCenterErrorCode.TELEGRAM_FAILED,
            });
        }

        return privacyCenterJson({
            success: true,
            message: 'Submission received',
            error_code: PrivacyCenterErrorCode.OK,
        });
    } catch (err) {
        console.error('Unhandled error:', err);
        return privacyCenterJson(
            {
                success: false,
                message: 'Internal server error',
                error_code: PrivacyCenterErrorCode.INTERNAL,
            },
            { status: 500 }
        );
    }
}