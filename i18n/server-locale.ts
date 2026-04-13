import { headers } from 'next/headers'
import type { Locale } from './types'
import { DEFAULT_LOCALE, isLocale, LOCALE_HEADER } from './types'

/** Locale cho Server Components / generateMetadata (header do middleware gắn). */
export function getServerLocale(): Locale {
  const h = headers().get(LOCALE_HEADER)
  if (isLocale(h)) return h
  return DEFAULT_LOCALE
}
