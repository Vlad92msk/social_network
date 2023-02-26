import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { IconName } from '@public/models/icon.model'
import { ButtonContentLoader } from '@shared/components/ButtonContentLoader'
import { Icon } from '@shared/components/Icon'

import { makeCn } from '../../utils'
import styles from './Button.module.scss'

const cn = makeCn('Button', styles)

export type ButtonStyleType = 'filled' | 'rounded';
/**
 * Названия берем из templates.scss
 */
export type ButtonNames = 'red' | 'green';

export interface ButtonOwnProps<T extends ButtonStyleType> {
  children: string | React.ReactNode
  className?: string
  styleType: T
  buttonName: ButtonNames
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  icon?: IconName
  iconPosition?: 'left' | 'right'
  iconClassName?: string
  loadable?: boolean
  loaded?: number
}

export type ButtonProps<E extends React.ElementType,
  T extends ButtonStyleType,
  > = PolymorphicComponentProps<E, ButtonOwnProps<T>>;

const DEFAULT_ELEMENT = 'button'

export const Button = <E extends React.ElementType = typeof DEFAULT_ELEMENT, T extends ButtonStyleType = 'filled'>(props: ButtonProps<E, T>) => {
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
  size: 'medium',
  type: 'button',
  disabled: false,
  iconPosition: 'right',
  loadable: false,
  loaded: 0,
  // @ts-ignore
} as unknown as Partial<ButtonOwnProps<undefined>>
