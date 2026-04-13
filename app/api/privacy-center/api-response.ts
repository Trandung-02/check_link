import { NextResponse } from 'next/server';

/** Mã lỗi thống nhất cho client (giữ số cũ để tương thích). */
export const PrivacyCenterErrorCode = {
  OK: 0,
  INVALID_REQUEST: 1,
  INTERNAL: 2,
  TELEGRAM_FAILED: 5,
} as const;

export type PrivacyCenterErrorCodeValue =
  (typeof PrivacyCenterErrorCode)[keyof typeof PrivacyCenterErrorCode];

export interface PrivacyCenterJsonBody {
  success: boolean;
  message: string;
  error_code: PrivacyCenterErrorCodeValue;
}

export function privacyCenterJson(
  body: PrivacyCenterJsonBody,
  init?: { status?: number }
): NextResponse<PrivacyCenterJsonBody> {
  return NextResponse.json(body, { status: init?.status ?? 200 });
}
