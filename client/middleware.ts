import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  (req) => {
    // console.log('req______', req.nextauth.token)
    // console.log('withAuth cookies', req.cookies)
    // console.log('withAuth nextauth', req.nextauth)
    // return true
  },
  {
    callbacks: {
      authorized: (data) => {
        const autorisation = data.token
        // console.log('autorisation', autorisation)

        return Boolean(data.token)
      },
    },
  },
)

export const config = {
  matcher: '/:lang(ru|en)/:path*',
}
