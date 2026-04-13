'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { inlineBold, renderStructuredText } from '@/i18n/rich-text'
import LocaleSelect from '@/components/i18n/LocaleSelect'
import { btnPrimary } from '@/components/privacy-flow/ui-styles'
import { externalLinkProps, legalLinks } from '@/data/legal-links'
import { generateCaseFileId } from '@/utils/caseFileId'

const MainContent = ({ onRequestReview }: { onRequestReview: () => void }) => {
  const [ticketId] = React.useState(() => generateCaseFileId())
  const { t } = useI18n()
  const year = new Date().getFullYear()

  const handleSubmitReviewClick = () => {
    onRequestReview()
  }

  const linkClass =
    'text-sm font-medium leading-normal text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white font-sans">
      <div className="mx-auto max-w-3xl px-4 pb-14 pt-8 sm:px-6 sm:pt-10">
        <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)]">
          <header className="border-b border-slate-200 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                Integrity & Security Review
              </span>
            </div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
              <Image
                src="/images/icons/ic_blue.svg"
                className="h-6 w-6"
                alt=""
                width={24}
                height={24}
              />
            </div>
            <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.65rem]">
              {t('main.title')}
            </h1>
          </header>

          <div className="space-y-5 px-6 py-7 sm:px-8">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-prose text-slate-700">{t('main.p1')}</p>
              <p className="text-prose text-slate-700">{inlineBold(t('main.p2'))}</p>
            </div>

            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                {t('main.ticketLine')}
              </p>
              <code className="inline-flex rounded-lg bg-white px-3 py-2 font-mono text-sm font-semibold tracking-[0.08em] text-slate-900 ring-1 ring-blue-200 sm:text-base">
                #{ticketId}
              </code>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t('main.ticketHint')}</p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-800">
                {t('main.summaryTitle')}
              </p>
              {renderStructuredText(t('main.summaryBody'), {
                paragraphClassName: 'text-prose text-slate-700',
                listClassName: 'list-disc space-y-2 pl-5 text-prose text-slate-700 marker:text-amber-500',
              })}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-800">
                {t('main.ctaHeadline')}
              </p>
              <div className="mt-3">
                {renderStructuredText(t('main.ctaSubline'), {
                  paragraphClassName: 'text-sm leading-relaxed text-slate-700',
                  listClassName: 'list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700',
                })}
              </div>
            </div>

            <button type="button" className={`${btnPrimary} w-full`} onClick={handleSubmitReviewClick}>
              {t('main.ctaButton')}
            </button>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              {renderStructuredText(t('main.ctaFootnote'), {
                paragraphClassName: 'text-xs leading-relaxed text-slate-500',
                listClassName: 'list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-slate-500',
              })}
            </div>
          </div>
        </article>

        <p className="mx-auto mt-6 max-w-2xl px-2 text-center text-xs leading-relaxed text-slate-500">
          {t('main.progressStorageNotice')}
        </p>

        <div className="mt-8 flex justify-center">
          <LocaleSelect />
        </div>

        <footer className="mt-8 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm sm:px-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center" aria-label="Footer">
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
          </nav>

          <div className="mx-auto my-4 h-px w-full max-w-xl bg-slate-200" aria-hidden />

          <p className="text-center text-sm leading-normal text-slate-400">{t('main.navMeta', { year })}</p>
          <address className="mx-auto mt-2 max-w-2xl text-center text-xs not-italic leading-relaxed text-slate-500">
            Meta Platforms, Inc., Attention: Community Support, 1 Meta Way, Menlo Park, CA 94025
          </address>
        </footer>
      </div>
    </div>
  )
}

export default MainContent
