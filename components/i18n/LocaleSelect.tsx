'use client'

import React from 'react'
import { useI18n, useSetLocalePersist } from '@/i18n/I18nProvider'
import { LOCALES, type Locale } from '@/i18n/types'

const NATIVE_LABEL: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  zh: '简体中文',
  ms: 'Bahasa Melayu',
}

export default function LocaleSelect({ className = '' }: { className?: string }) {
  const { locale, t } = useI18n()
  const setPersist = useSetLocalePersist()

  return (
    <label
      className={`flex flex-wrap items-center justify-center gap-2 text-[13px] text-slate-600 ${className}`}
    >
      <span className="shrink-0 font-medium text-slate-700">{t('i18nSwitcher')}</span>
      <select
        className="max-w-[min(220px,100%)] cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-900 shadow-sm transition hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        value={locale}
        aria-label={t('i18nSwitcher')}
        onChange={(e) => setPersist(e.target.value as Locale)}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {NATIVE_LABEL[l]}
          </option>
        ))}
      </select>
    </label>
  )
}
