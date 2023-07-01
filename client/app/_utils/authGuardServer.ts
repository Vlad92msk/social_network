import { getUser } from './getUser'
import { UserPageUrlParams } from '../[locale]/[user_id]/page'

type AuthGuardProps = UserPageUrlParams

export const authGuardServer = async (props: AuthGuardProps) => {
  const { user_id } = props
  const user = await getUser()

  const blocked = user?.privatePolicy?.blocked
  const blockedFriends = blocked?.friends
  return !blockedFriends?.includes(user_id)
}
