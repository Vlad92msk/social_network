import { redirect } from 'next/navigation'
import { getLocale } from './_utils/getLocale'
import { getUser } from './_utils/getUser'
// Next.js 13


const Home = async (props) => {
  const locale = getLocale()
  const user = await getUser()
  const currentUser = user?.uuid
  return currentUser ? redirect(`/${locale}/${currentUser}`) : redirect('/signin')
}
export default Home
