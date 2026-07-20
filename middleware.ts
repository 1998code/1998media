import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - ads.txt (AdSense ads.txt file)
    // - robots.txt (robots.txt file)
    // - sitemap.xml (sitemap file)
    // - assets (public static assets)
    '/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml|assets).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Supported locales
  const supportedLocales = ['en', 'en-US', 'en-GB', 'zh', 'zh-HK', 'zh-CN', 'zh-TW', 'ko', 'ko-KR', 'ja', 'ja-JP']
  
  // Extract locale from pathname if present
  const pathParts = pathname.split('/').filter(Boolean)
  const firstPart = pathParts[0] || ''
  
  // Check if first part is a locale
  const isLocale = supportedLocales.includes(firstPart)
  
  if (isLocale) {
    // Valid locale, let it through
    return
  }
  
  // Check if it looks like a locale but isn't supported (e.g., /fr, /de, etc.)
  // If pathname starts with / and has a 2-5 character code, it might be an unsupported locale
  const looksLikeLocale = /^\/[a-z]{2}(-[A-Z]{2})?(\/|$)/i.test(pathname)
  
  if (looksLikeLocale && firstPart.length >= 2 && firstPart.length <= 5) {
    // Unsupported locale detected, redirect to English
    const restOfPath = pathname.replace(`/${firstPart}`, '') || '/'
    req.nextUrl.pathname = `/en${restOfPath}`
    return NextResponse.redirect(req.nextUrl)
  }

  // No locale in path, detect from header and redirect
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