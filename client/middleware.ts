import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

export const locales = ['en', 'ru']


const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'ru',
})

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
