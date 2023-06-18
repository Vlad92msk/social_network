import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn } from '@public/utils'
import styles from './SignIn.module.scss'

const cn = makeCn('SignIn', styles)


export const SignIn = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className={cn()}>
      SignIn
      <ButtonBox onClick={async () => {
        await signIn('google', { callbackUrl })
      }}
      >
        google
      </ButtonBox>
    </div>
  )
}
