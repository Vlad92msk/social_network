import { redirect } from 'next/navigation'
import { AuthOptions, getServerSession } from 'next-auth'
import { authConfig } from '../_configs/auth'
import { UserType } from '../api/user/allUsers'

// Next.js 13

export interface PageProps {
  searchParams: object
  params: {
    locale: string,
    searchParams: Record<string, any>
  }
}

const Home = async (props : PageProps) => {
  const { params: { locale } } = props
  const session = await getServerSession<AuthOptions, {user: UserType}>(authConfig)
  const currentUser = session?.user.uuid

  return redirect(`/${locale}/${currentUser}`)
}

export default Home
