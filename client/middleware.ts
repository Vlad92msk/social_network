import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export const locales = ['en', 'ru']
export const DEFAULT_LOCALE = 'ru'


const authMiddleware = withAuth(
  // (req) => {},
  {
    callbacks: {
      authorized: (data) => Boolean(data.token),
    },
  },
)


export default function middleware(req: NextRequest) {
  return (authMiddleware as any)(req)
}

export const config = {
  matcher: '/:lang(ru|en)/:path*',
}
