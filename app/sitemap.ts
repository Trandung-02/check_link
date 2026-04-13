import type { MetadataRoute } from 'next'

function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, '')
  return 'http://localhost:3000'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase()
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/privacy-center`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
