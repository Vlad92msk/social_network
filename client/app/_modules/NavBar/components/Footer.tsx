// eslint-disable-next-line import/no-extraneous-dependencies
import { signOut } from 'next-auth/react'
import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn } from '@public/utils'
import styles from '../NavBar.module.scss'

const cn = makeCn('Footer', styles)

export const Footer = () => (
  <div className={cn()}>
    <ButtonBox onClick={() => signOut()}>
      Выйти
    </ButtonBox>
  </div>
)
