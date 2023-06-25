import { AuthOptions, getServerSession } from 'next-auth'
import { UserPageUrlParams } from '../[lang]/[user_id]/page'
import { authConfig } from '../_configs/auth'
import { UserType } from '../api/user/allUsers'

type AuthGuardProps = UserPageUrlParams

export const authGuardServer = async (props: AuthGuardProps) => {
  const { user_id } = props
  const session = await getServerSession<AuthOptions, {user: UserType}>(authConfig)

  const blocked = session?.user.privatePolicy?.blocked
  const blockedFriends = blocked?.friends
  return !blockedFriends?.includes(user_id)
}
