'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { getMessages } from './dictionary'
import type { MessageTree } from './messages/en'
import { resolveLocaleFromCountryCode } from './country-locale'
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  localeToHtmlLang,
  type Locale,
  LOCALES,
  USER_PREF_LS,
} from './types'

type I18nContextValue = {
  locale: Locale
  /** Ghi nhớ lựa chọn người dùng (localStorage + cookie). */
  setLocale: (locale: Locale, options?: { persistUserChoice?: boolean }) => void
  t: (path: string, vars?: Record<string, string | number>) => string
  messages: MessageTree
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`))
  const raw = m?.[1] ? decodeURIComponent(m[1]) : ''
  return isLocale(raw) ? raw : null
}

function writeCookieLocale(locale: Locale) {
  if (typeof document === 'undefined') return
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=31536000;SameSite=Lax`
}

function readUserPref(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(USER_PREF_LS)
    return isLocale(v) ? v : null
  } catch {
    return null
  }
}

function writeUserPref(locale: Locale) {
  try {
    localStorage.setItem(USER_PREF_LS, locale)
  } catch {
    /* ignore */
  }
}

function getNested(obj: unknown, path: string): string {
  const keys = path.split('.')
  let cur: unknown = obj
  for (const k of keys) {
    if (cur == null || typeof cur !== 'object') return path
    cur = (cur as Record<string, unknown>)[k]
  }
  return typeof cur === 'string' ? cur : path
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const countryCode = useAppSelector((s) => s.stepForm.data.country_code)
  const ip = useAppSelector((s) => s.stepForm.data.ip)

  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [hydrated, setHydrated] = useState(false)

  const setLocale = useCallback((next: Locale, options?: { persistUserChoice?: boolean }) => {
    setLocaleState(next)
    writeCookieLocale(next)
    if (options?.persistUserChoice) {
      writeUserPref(next)
    }
  }, [])

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const tree = getMessages(locale)
      let s = getNested(tree as unknown as Record<string, unknown>, path)
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
        }
      }
      return s
    },
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      messages: getMessages(locale),
    }),
    [locale, setLocale, t],
  )

  useEffect(() => {
    const userPref = readUserPref()
    const cookieLoc = readCookieLocale()
    const fromNav =
      typeof navigator !== 'undefined'
        ? LOCALES.find((l) => navigator.language?.toLowerCase().startsWith(l)) ?? null
        : null

    let initial: Locale = cookieLoc ?? fromNav ?? DEFAULT_LOCALE
    if (userPref) initial = userPref

    setLocaleState(initial)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    document.documentElement.lang = localeToHtmlLang(locale)
  }, [hydrated, locale])

  useEffect(() => {
    if (!hydrated) return
    if (readUserPref()) return
    if (!countryCode || !ip || ip === '0.0.0.0') return
    const fromCountry = resolveLocaleFromCountryCode(countryCode)
    if (fromCountry === null) return
    if (fromCountry !== locale) {
      setLocaleState(fromCountry)
      writeCookieLocale(fromCountry)
    }
  }, [hydrated, countryCode, ip, locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

/** Chọn ngôn ngữ (dropdown): lưu lựa chọn người dùng. */
export function useSetLocalePersist() {
  const { setLocale } = useI18n()
  return (locale: Locale) => setLocale(locale, { persistUserChoice: true })
}
