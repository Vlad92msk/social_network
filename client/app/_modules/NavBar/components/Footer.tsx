// 'use client'

import { ButtonBox } from '@public/components/ButtonBox'
import { makeCn, classNames } from '@public/utils'
import styles from '../NavBar.module.scss'

const cn = makeCn('Footer', styles)

export const Footer = () => (
  <div className={cn()}>
    <ButtonBox>
      Выйти
    </ButtonBox>
  </div>
)
