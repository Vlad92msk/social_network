import { Button } from '@shared/components/Button'
import { makeCn } from '@shared/utils'
import styles from './Footer.module.scss'

const cn = makeCn('Footer', styles)

export const Footer = () => (
  <div className={cn()}>
    <Button styleType="rounded" buttonName="red" icon="exit" iconPosition="left">
      Выйти
    </Button>
  </div>
)
