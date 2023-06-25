import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthOptions, getServerSession } from 'next-auth'
import { authConfig } from './_configs/auth'
import { UserType } from './api/user/allUsers'
// Next.js 13


const Home = async (props) => {
  const session = await getServerSession<AuthOptions, {user: UserType}>(authConfig)
  const currentUser = session?.user.uuid
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'ru'

  return currentUser ? redirect(`/${locale}/${currentUser}`) : redirect('/signin')
}

export default Home
