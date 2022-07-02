import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

export default function middleware(req: NextRequest) {
  const locale = req.headers.get('accept-language')?.split(',')?.[0] == 'zh-TW' ? 'zh' : 'en'
  req.nextUrl.pathname = `/${locale}`
  return NextResponse.rewrite(req.nextUrl)
}