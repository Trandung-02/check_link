export const LOCALES = ['vi', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'th', 'id', 'zh', 'ms'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const LOCALE_HEADER = 'x-next-locale'

export const USER_PREF_LS = 'i18n-user-locale'

export function isLocale(s: string | null | undefined): s is Locale {
  return !!s && (LOCALES as readonly string[]).includes(s)
}

/** BCP 47 cho thẻ <html lang> */
export function localeToHtmlLang(locale: Locale): string {
  const map: Record<Locale, string> = {
    vi: 'vi',
    en: 'en',
    de: 'de',
    es: 'es',
    fr: 'fr',
    ja: 'ja',
    ko: 'ko',
    pt: 'pt-BR',
    th: 'th',
    id: 'id',
    zh: 'zh-CN',
    ms: 'ms',
  }
  return map[locale]
}
