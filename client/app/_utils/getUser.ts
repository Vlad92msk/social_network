import { AuthOptions, getServerSession } from 'next-auth'
import { authConfig } from '../_configs/auth'
import { UserType } from '../api/user/allUsers'


export const getUser = async () => {
  const session = await getServerSession<AuthOptions, {user: UserType}>(authConfig)

  return session?.user
}
