import type { Locale } from './types'
import { DEFAULT_LOCALE } from './types'

/**
 * ISO 3166-1 alpha-2 → locale giao diện (chỉ ghi quốc gia không mặc định tiếng Anh).
 * Quốc gia không có trong bảng → `en` (tiếng Anh).
 *
 * Ghi chú: ưu tiên ngôn ngữ chính / ngôn ngữ làm việc & giao diện web phổ biến;
 * quốc gia đa ngữ (ví dụ Bỉ, Canada) dùng `en` trung lập khi không có locale tương ứng.
 * MS (Montserrat) ≠ locale `ms` (Bahasa Melayu) — Montserrat không nằm trong map → en.
 */
const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // —— Tiếng Việt ——
  VN: 'vi',

  // —— Tiếng Đức ——
  DE: 'de',
  AT: 'de',
  LI: 'de',
  CH: 'de',

  // —— Tiếng Tây Ban Nha (Tây Ban Nha + Mỹ Latin + Andorra + Guinea Xích Đạo) ——
  ES: 'es',
  AD: 'es',
  MX: 'es',
  GT: 'es',
  HN: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  CU: 'es',
  DO: 'es',
  PR: 'es',
  EC: 'es',
  CO: 'es',
  VE: 'es',
  BO: 'es',
  PY: 'es',
  AR: 'es',
  CL: 'es',
  PE: 'es',
  UY: 'es',
  GQ: 'es',

  // —— Tiếng Pháp (Pháp + lãnh thổ hải ngoại + châu Phi / Ấn Đại Dương francophone chính) ——
  FR: 'fr',
  LU: 'fr',
  MC: 'fr',
  RE: 'fr',
  YT: 'fr',
  GP: 'fr',
  MQ: 'fr',
  GF: 'fr',
  PF: 'fr',
  NC: 'fr',
  BL: 'fr',
  MF: 'fr',
  PM: 'fr',
  WF: 'fr',
  SN: 'fr',
  CI: 'fr',
  ML: 'fr',
  BF: 'fr',
  NE: 'fr',
  TG: 'fr',
  BJ: 'fr',
  CD: 'fr',
  CG: 'fr',
  CF: 'fr',
  GA: 'fr',
  TD: 'fr',
  KM: 'fr',
  DJ: 'fr',
  MG: 'fr',
  GN: 'fr',
  DZ: 'fr',
  TN: 'fr',
  MA: 'fr',
  BI: 'fr',
  HT: 'fr',

  // —— Tiếng Bồ Đào Nha ——
  BR: 'pt',
  PT: 'pt',
  AO: 'pt',
  MZ: 'pt',
  GW: 'pt',
  CV: 'pt',
  ST: 'pt',
  TL: 'pt',

  // —— Tiếng Nhật / Hàn ——
  JP: 'ja',
  KR: 'ko',

  // —— Tiếng Thái / Indonesia / Melayu ——
  TH: 'th',
  ID: 'id',
  MY: 'ms',
  BN: 'ms',

  // —— Tiếng Trung (Giản thể / chung Hoa ngữ; HK/MO/TW vẫn dùng gói zh) ——
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  MO: 'zh',
}

/**
 * Trả về locale hiển thị theo mã quốc gia từ geolocation.
 * `null` = chưa có mã hợp lệ (chưa load IP / dữ liệu lỗi).
 * Mọi mã ISO 2 chữ còn lại → **en**.
 */
export function resolveLocaleFromCountryCode(countryCode: string | undefined | null): Locale | null {
  if (countryCode == null) return null
  const cc = String(countryCode).trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(cc)) return null
  return COUNTRY_TO_LOCALE[cc] ?? DEFAULT_LOCALE
}
