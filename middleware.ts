import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

export default function middleware(req: NextRequest) {
  const country = req.geo?.country?.toLowerCase() || 'us'
  const locale = req.headers.get('accept-language')?.split(',')?.[0] == 'zh-TW' ? 'zh' : 'en'

  // Rewrite the path (`/`) to the localized page (pages/[locale]/[country])
  req.nextUrl.pathname = `/${locale}`
  return NextResponse.rewrite(req.nextUrl)
}