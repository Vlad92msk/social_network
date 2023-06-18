import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'
import { authConfig } from '../_configs/auth'


export const isHasSessions = async () => {
  const session = await getServerSession(authConfig)
  if (!session) redirect('/signin')

  return session
}
