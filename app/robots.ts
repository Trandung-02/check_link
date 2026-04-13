import type { MetadataRoute } from 'next'

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, '')
  return 'http://localhost:3000'
}

export default function robots(): MetadataRoute.Robots {
  const base = siteBase()
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  }
}
