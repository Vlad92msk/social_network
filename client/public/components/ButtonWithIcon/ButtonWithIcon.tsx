import { classnames } from '@bem-react/classnames'
import { PropsWithChildren, useRef } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon, IconProps } from '@public/components/Icon'

import { useRect } from '@public/hooks'
import { makeCn, rem } from '@public/utils'
import styles from './ButtonWithIcon.module.scss'

const cn = makeCn('ButtonWithIcon', styles)

export interface ButtonWithIconProps extends PropsWithChildren {
    iconProps: IconProps
    className?: string
    iconPosition?: 'left' | 'right'
    width?: string | number
    height?: string | number
}

export const ButtonWithIcon = (props: ButtonWithIconProps) => {
  const { iconProps, width, height, iconPosition, className, children } = props

  const iconRef = useRef<HTMLOrSVGElement>(null)
  const iconRect = useRect<'svg'>(iconRef, ['width'])

  return (
    <ButtonBox<'button'>
      className={classNames(cn(), className)}
      style={{ width: rem(width), height: rem(height) }}
    >
      <Icon ref={iconRef} className={cn('Icon', { iconPosition })} {...iconProps} />
      <div
        className={cn('Inner')}
        style={{ maxWidth: iconRect?.width && `calc(100% - ${rem(Number(iconRect.width) * 2) || 0})` }}
      >
        {children}
      </div>
    </ButtonBox>
  )
}
