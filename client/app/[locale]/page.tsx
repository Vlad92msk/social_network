import { redirect } from 'next/navigation'
import { getLocale } from '../_utils/getLocale'
import { getUser } from '../_utils/getUser'

// Next.js 13

export interface PageProps {
  searchParams: object
  params: {
    locale: string,
    searchParams: Record<string, any>
  }
}

const Home = async (props : PageProps) => {
  const locale = getLocale()
  const user = await getUser()
  const currentUser = user?.uuid

  return redirect(`/${locale}/${currentUser}`)
}

export default Home
