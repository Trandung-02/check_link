import { NextRequest, NextResponse } from 'next/server'
import { pickLocaleFromAcceptLanguage } from '@/i18n/accept-language'
import { isLocale, LOCALE_COOKIE, LOCALE_HEADER, type Locale } from '@/i18n/types'

// Danh sách bot và crawler phổ biến
const BOT_REGEX = /bot|crawler|spider|crawling|scraper|fetcher|indexer|archiver|monitor|validator|checker|linter|analyzer|parser|extractor|harvester|collector|aggregator|facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|slackbot|telegrambot|whatsapp|zalo|discord|googlebot|bingbot|yandexbot|baiduspider|sogou|exabot|mj12bot|dotbot|ahrefsbot|semrushbot|rogerbot|archive\.org_bot|ia_archiver|special_archiver|archive-crawler|curl|wget|python-requests|java\/|go-http-client|\.net|scrapy|beautifulsoup|mechanize|lxml|htmlunit|phantomjs|casperjs|selenium|chrome-headless|headlesschrome|puppeteer|playwright|webdriver/i

// Headless / automation (hẹp — tránh nhầm trình duyệt thật)
const HEADLESS_REGEX =
  /headlesschrome|headless chrome|phantomjs|selenium|webdriver|puppeteer|playwright|nightmare/i

// Công cụ HTTP thường dùng cho QA — chỉ gắn cờ khi kèm tín hiệu không-phải-trình-duyệt (Accept / Accept-Language).
const SUSPICIOUS_REGEX = /python-requests|scrapy|beautifulsoup|httpie|postman|insomnia|rest-client/i

function resolveLocaleInMiddleware(req: NextRequest): Locale {
  const c = req.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(c)) return c
  return pickLocaleFromAcceptLanguage(req.headers.get('accept-language'))
}

function withRequestLocale(req: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set(LOCALE_HEADER, locale)
  return requestHeaders
}

function maybeSetLocaleCookie(res: NextResponse, req: NextRequest, pathname: string, locale: Locale) {
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) return
  const existing = req.cookies.get(LOCALE_COOKIE)?.value
  if (!isLocale(existing)) {
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
  }
}

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || ''
  const acceptHeader = req.headers.get('accept') || ''
  const acceptLanguage = req.headers.get('accept-language') || ''

  const { pathname } = req.nextUrl

  // ❌ Không rewrite các route hệ thống
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/metadata') ||
    pathname.includes('.')
  ) {
    const locale = resolveLocaleInMiddleware(req)
    const res = NextResponse.next({ request: { headers: withRequestLocale(req, locale) } })
    maybeSetLocaleCookie(res, req, pathname, locale)
    return res
  }

  // 🔍 Bot / crawler — ưu tiên UA rõ ràng; công cụ CLI chỉ khi thiếu header trình duyệt điển hình
  let isBot = BOT_REGEX.test(userAgent) || HEADLESS_REGEX.test(userAgent)

  if (userAgent.includes('HeadlessChrome') || /\bHeadless\b/i.test(userAgent)) {
    isBot = true
  }

  if (userAgent.includes('Selenium') || userAgent.includes('WebDriver')) {
    isBot = true
  }

  const looksLikeHttpTool = SUSPICIOUS_REGEX.test(userAgent)
  if (looksLikeHttpTool && (!acceptHeader || acceptHeader === '*/*')) {
    isBot = true
  }

  if (looksLikeHttpTool && !acceptLanguage) {
    isBot = true
  }

  const botLocale: Locale = 'en'
  const humanLocale = resolveLocaleInMiddleware(req)

  if (isBot) {
    const url = req.nextUrl.clone()
    url.pathname = '/metadata'
    const res = NextResponse.rewrite(url, { request: { headers: withRequestLocale(req, botLocale) } })
    maybeSetLocaleCookie(res, req, pathname, botLocale)
    return res
  }

  const res = NextResponse.next({ request: { headers: withRequestLocale(req, humanLocale) } })
  maybeSetLocaleCookie(res, req, pathname, humanLocale)
  return res
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
}
