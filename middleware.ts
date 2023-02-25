import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const locale = req.headers.get('accept-language')?.split(',')?.[0]
  switch (locale) {
    case 'zh-TW':
      req.nextUrl.pathname = '/zh'
      return NextResponse.rewrite(req.nextUrl)
    case 'zh-CN':
      req.nextUrl.pathname = '/cn'
      return NextResponse.rewrite(req.nextUrl)
    case 'ru':
      req.nextUrl.pathname = '/ru'
      return NextResponse.rewrite(req.nextUrl)
    default:
      req.nextUrl.pathname = '/' + locale
      return NextResponse.rewrite(req.nextUrl)
  }
}