import { ButtonBox } from 'public/components/ButtonBox'
import { makeCn } from 'public/utils'
import styles from './Footer.module.scss'

const cn = makeCn('Footer', styles)

export const Footer = () => (
  <div className={cn()}>
    <ButtonBox>
      Выйти
    </ButtonBox>
  </div>
)
