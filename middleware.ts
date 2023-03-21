import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const locale = req.headers.get('accept-language')?.split(',')?.[0]

  switch (locale) {
    default:
      req.nextUrl.pathname = '/' + locale
      return NextResponse.rewrite(req.nextUrl)
  }
}