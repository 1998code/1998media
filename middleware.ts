import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Check if we already have a locale in the pathname
  // Match: en, en-US, en-GB, zh, zh-HK, zh-CN, zh-TW, ko, ko-KR, ja, ja-JP, etc.
  const hasLocale = /^\/(en|en-US|en-GB|zh|zh-HK|zh-CN|zh-TW|ko|ko-KR|ja|ja-JP)(\/|$)/.test(pathname)
  if (hasLocale) return

  // Get locale from header
  const acceptLanguage = req.headers.get('accept-language')
  const locale = acceptLanguage?.split(',')?.[0]?.toLowerCase()

  let targetLocale = 'en' // Default
  if (locale) {
    if (locale.startsWith('zh-hk') || locale.startsWith('zh-tw')) targetLocale = 'zh-HK'
    else if (locale.startsWith('zh')) targetLocale = 'zh'
    else if (locale.startsWith('ko')) targetLocale = 'ko'
    else if (locale.startsWith('ja')) targetLocale = 'ja'
  }

  // Redirect to localized path
  req.nextUrl.pathname = `/${targetLocale}${pathname}`
  return NextResponse.redirect(req.nextUrl)
}