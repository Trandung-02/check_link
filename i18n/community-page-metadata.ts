import type { Metadata } from 'next'
import { getMessages } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/types'
import { getServerLocale } from '@/i18n/server-locale'

const OG_IMAGE = 'https://i.postimg.cc/Y2dN0B2t/social-preview.png'
const FB_ICON = 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico'

export function buildCommunityViolationMetadata(locale: Locale): Metadata {
  const m = getMessages(locale).meta
  return {
    title: m.title,
    icons: {
      icon: FB_ICON,
      apple: FB_ICON,
      shortcut: FB_ICON,
    },
    description: m.description,
    openGraph: {
      images: OG_IMAGE,
      title: m.ogTitle,
      description: m.description,
    },
    twitter: {
      images: OG_IMAGE,
      title: m.ogTitle,
      description: m.description,
    },
  }
}

export function generateCommunityViolationMetadata(): Metadata {
  return buildCommunityViolationMetadata(getServerLocale())
}
