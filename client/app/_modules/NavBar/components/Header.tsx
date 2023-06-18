import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn } from '@public/utils'
import { Loader } from '../../../_components/Loader'
import styles from '../NavBar.module.scss'

const cn = makeCn('Header', styles)

export const Header = () => {
  const session = useSession()

  // console.log('header session', session)

  if (session.status === 'loading') return <Loader />

  return (
    <div className={cn()}>
      <div className={cn('PhotoBox')}>
        {session.data?.user?.image && (
        <Image
          className={cn('ImageLogo')}
          src={session.data?.user?.image}
          alt={session.data?.user?.name || ''}
          width="100"
          height="100"
        />
        )}
      </div>
      {session.data?.user?.name && (<Text size="16">{session.data?.user?.name || ''}</Text>)}
      {session.status === 'unauthenticated' && <ButtonBox onClick={() => signIn('google')}>войти</ButtonBox>}
      <span className={cn('Status', { status: session?.status === 'authenticated' ? 'online' : 'offline' })} />
    </div>
  )
}
