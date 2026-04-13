'use client'
import Link from 'next/link'
import React from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { inlineBold } from '@/i18n/rich-text'
import LocaleSelect from '@/components/i18n/LocaleSelect'
import { btnPrimary } from '@/components/privacy-flow/ui-styles'
import { externalLinkProps, legalLinks } from '@/data/legal-links'

const MainContent = ({ onRequestReview }: { onRequestReview: () => void }) => {
  const [ticketId, setTicketId] = React.useState('4564-ATFD-4865')
  const { t } = useI18n()
  const year = new Date().getFullYear()

  const handleSubmitReviewClick = () => {
    onRequestReview()
  }

  React.useEffect(() => {
    const generateTicketId = () => {
      const section1 = Math.random().toString(36).substring(2, 6).toUpperCase()
      const section2 = Math.random().toString(36).substring(2, 6).toUpperCase()
      const section3 = Math.random().toString(36).substring(2, 6).toUpperCase()
      setTicketId(`${section1}-${section2}-${section3}`)
    }
    generateTicketId()
  }, [])

  const linkClass =
    'text-sm font-medium leading-normal text-slate-500 underline-offset-4 transition hover:text-slate-800 hover:underline'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white font-sans">
      <div className="mx-auto max-w-xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-xl shadow-slate-900/[0.06] ring-1 ring-slate-900/[0.03]">
          <header className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 py-7 sm:px-8 sm:py-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
              <img src="/images/icons/ic_blue.svg" className="h-7 w-7" alt="" />
            </div>
            <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.6875rem] sm:leading-tight">
              {t('main.title')}
            </h1>
          </header>

          <div className="space-y-5 px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-prose text-slate-600">{t('main.p1')}</p>
            <p className="text-prose text-slate-600">{inlineBold(t('main.p2'))}</p>

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-0.5">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {t('main.ticketLine')}
              </span>
              <code className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold leading-none text-slate-800 ring-1 ring-slate-200/80 sm:text-[13px]">
                #{ticketId}
              </code>
              <span className="text-slate-300" aria-hidden>
                ·
              </span>
              <span className="text-sm leading-normal text-slate-500">{t('main.ticketHint')}</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {t('main.summaryTitle')}
              </p>
              <p className="text-prose text-slate-700">{t('main.summaryBody')}</p>
            </div>
          </div>

          <footer className="border-t border-slate-100 bg-slate-50/60 px-6 py-8 sm:px-8">
            <p className="mb-2 text-center text-base font-semibold leading-snug text-slate-900">
              {t('main.ctaHeadline')}
            </p>
            <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-slate-500">
              {t('main.ctaSubline')}
            </p>
            <button
              type="button"
              className={`${btnPrimary} mx-auto w-full max-w-md`}
              onClick={handleSubmitReviewClick}
            >
              {t('main.ctaButton')}
            </button>
            <p className="mx-auto mt-4 max-w-md text-center text-xs leading-relaxed text-slate-500">
              {inlineBold(t('main.ctaFootnote'))}
            </p>
          </footer>
        </article>

        <div className="mt-8 flex justify-center">
          <LocaleSelect />
        </div>

        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-8 text-center"
          aria-label="Footer"
        >
          <Link href={legalLinks.helpCenter} className={linkClass} {...externalLinkProps}>
            {t('main.navHelp')}
          </Link>
          <Link href={legalLinks.privacyPolicy} className={linkClass} {...externalLinkProps}>
            {t('main.navPrivacy')}
          </Link>
          <Link href={legalLinks.termsOfService} className={linkClass} {...externalLinkProps}>
            {t('main.navTerms')}
          </Link>
          <Link href={legalLinks.communityStandards} className={linkClass} {...externalLinkProps}>
            {t('main.navCommunity')}
          </Link>
          <span className="text-sm leading-normal text-slate-400">{t('main.navMeta', { year })}</span>
        </nav>
      </div>
    </div>
  )
}

export default MainContent
