import { classnames } from '@bem-react/classnames'
import { ButtonBox } from '@public/components/ButtonBox'
import { IconProps } from '@public/components/Icon'
import { makeCn, rem } from '@public/utils'
import styles from './IconButton.module.scss'

const cn = makeCn('IconButton', styles)

export interface IconButtonProps extends IconProps {
    width?: string | number
    height?: string | number
}

export const IconButton = (props: IconButtonProps) => {
  const { width, height, className } = props

  return (
    <ButtonBox<'svg'>
      as="svg"
      className={classnames(cn(), className)}
      style={{ width: rem(width), height: rem(height) }}
    />
  )
}
