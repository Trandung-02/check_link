import { MarketingLayout } from '#components/layout'
import { Metadata } from 'next'

function siteMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) {
    try {
      return new URL(raw.endsWith('/') ? raw.slice(0, -1) : raw)
    } catch {
      /* ignore */
    }
  }
  return new URL('http://localhost:3000')
}

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: 'Account & community resources',
  description:
    'Security review workflows, privacy center navigation, and community standards information.',
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MarketingLayout>{props.children}</MarketingLayout>
}
