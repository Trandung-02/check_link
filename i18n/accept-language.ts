import type { Locale } from './types'
import { DEFAULT_LOCALE, LOCALES } from './types'

/** Chọn locale đầu tiên khớp với chuỗi Accept-Language (có hỗ trợ q=) */
export function pickLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage?.trim()) return DEFAULT_LOCALE

  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qPart = params.find((p) => p.trim().startsWith('q='))
      const q = qPart ? parseFloat(qPart.split('=')[1] || '1') : 1
      const base = (tag || '').split('-')[0]?.toLowerCase() || ''
      return { base, q: Number.isFinite(q) ? q : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { base } of candidates) {
    const exact = LOCALES.find((l) => l === base)
    if (exact) return exact
    if (base === 'zh' || base === 'cmn') return 'zh'
    if (base === 'in' || base === 'ind') return 'id'
    if (base === 'may' || base === 'msa') return 'ms'
  }

  return DEFAULT_LOCALE
}
