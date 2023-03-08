import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { IconName } from '@public/models/icon.model'
import { ButtonContentLoader } from '@shared/components/ButtonContentLoader'
import { Icon } from '@shared/components/Icon'

import styles from './Button.module.scss'
import { makeCn } from '../../utils'

const cn = makeCn('Button', styles)

export interface ButtonOwnProps {
  children: string | React.ReactNode
  className?: string
  disabled?: boolean
  icon?: IconName
  iconPosition?: 'left' | 'right'
  iconClassName?: string
  loadable?: boolean
  loaded?: number
}

export type ButtonProps<E extends React.ElementType> = PolymorphicComponentProps<E, ButtonOwnProps>;

const DEFAULT_ELEMENT = 'button'

export const Button = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: ButtonProps<E>) => {
  const {
    children,
    className,
    buttonName,
    styleType,
    size,
    disabled,
    icon,
    iconPosition,
    iconClassName,
    loadable,
    loaded,
    ...rest
  } = props

  return (
    <Box
      as={DEFAULT_ELEMENT}
      className={classnames(cn({
        size, buttonName, styleType, loading: loadable, icon: !!icon,
      }), className)}
      disabled={disabled || loadable}
      loadable={loadable?.toString()}
      loaded={loaded}
      {...rest}
    >
      <span className={cn('Inner')}>
        {loadable && (
          <>
            <div className={cn('LoadingBackground')} />
            <div className={cn('LoadingProgress')} style={{ width: `${loaded}%` }} />
            <ButtonContentLoader className={cn('LoadingContainer')} />
          </>
        )}
        {icon && (<Icon className={classnames(cn('Icon', { buttonName, styleType, iconPosition }), iconClassName)} icon={icon} />)}
        {children}
      </span>
    </Box>
  )
}

Button.defaultProps = {
  className: null,
  type: 'button',
  disabled: false,
  iconPosition: 'right',
  loadable: false,
  loaded: 0,
  // @ts-ignore
} as unknown as Partial<ButtonOwnProps<undefined>>
