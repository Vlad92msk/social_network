import { classnames } from '@bem-react/classnames'
import { ButtonHTMLAttributes } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon, IconProps } from '@public/components/Icon'
import { makeCn, rem } from '@public/utils'
import styles from './IconButton.module.scss'

const cn = makeCn('IconButton', styles)

export interface IconButtonProps extends IconProps, Partial<ButtonHTMLAttributes<HTMLOrSVGElement>> {
    width?: string | number
    height?: string | number
    iconClassName?: string
}

export const IconButton = (props: IconButtonProps) => {
  const {
    width, height, className, type, iconClassName, disabled, ...rest
  } = props

  return (
    <ButtonBox className={classnames(cn(), className)} type={type} disabled={disabled}>
      <Icon
        className={classnames(cn('Icon'), iconClassName)}
        style={{ width: rem(width), height: rem(height) }}
        {...rest}
      />
    </ButtonBox>
  )
}
