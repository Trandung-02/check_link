import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/helper/telegram';
import { parsePrivacyFormBody } from '@/app/api/privacy-center/parse-form';

export async function POST(req: Request) {
    try {
        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { message: 'Invalid JSON body', error_code: 1 },
                { status: 400 }
            );
        }

        const parsedData = parsePrivacyFormBody(body);
        if (!parsedData) {
            return NextResponse.json(
                { message: "Invalid request: expected { form: { ... } } with allowed fields", error_code: 1 },
                { status: 400 }
            );
        }

        try {
            await sendTelegramMessage(parsedData);
        } catch (telegramError: any) {
            console.error('Telegram send error:', telegramError?.message || telegramError);
            return NextResponse.json(
                { message: 'Request received but notification failed', error_code: 5 },
                { status: 200 }
            );
        }

        return NextResponse.json({ message: 'Success', error_code: 0 }, { status: 200 });
    } catch (err) {
        console.error('Unhandled error:', err);
        return NextResponse.json(
            { message: 'Internal server error', error_code: 2 },
            { status: 500 }
        );
    }
}