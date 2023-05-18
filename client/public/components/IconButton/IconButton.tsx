import { classnames } from '@bem-react/classnames'
import { ButtonHTMLAttributes } from 'react'
import { Icon, IconProps } from '@public/components/Icon'
import { makeCn, rem } from '@public/utils'
import styles from './IconButton.module.scss'

const cn = makeCn('IconButton', styles)

export interface IconButtonProps extends IconProps {
    width?: string | number
    height?: string | number
}

export const IconButton = (props: IconButtonProps & ButtonHTMLAttributes<HTMLOrSVGElement>) => {
  const { width, height, className, ...rest } = props

  return (
    <Icon
      // @ts-ignore
      type="button"
      className={classnames(cn(), className)}
      style={{ width: rem(width), height: rem(height) }}
      {...rest}
    />
  )
}
