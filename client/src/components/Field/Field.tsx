import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren } from 'react'
import { PolymorphicComponentProps } from 'react-polymorphic-box'
import { Text } from '@common'
import { Icon } from '@public/components/Icon'
import { makeCn } from '@public/utils'
import styles from './Field.module.scss'

const cn = makeCn('Field', styles)

export interface FieldOwnProps {
  className?: string
  style?: React.CSSProperties
  label?: string
  required?: boolean
  error?: string
  labelPosition?: 'top' | 'right' | 'left'
  labelColor?: 'inherit' | 'body' | 'title' | 'note' | 'disabled'
  labelSize?: 'regular' | 'small' | 'extraSmall'
  autoWidth?: boolean
  htmlFor?: string
}

export type FieldProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  PropsWithChildren<FieldOwnProps>
>;

const DEFAULT_ELEMENT = 'input'

export const Field = React.forwardRef(<E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: FieldProps<E>) => {
  const {
    className,
    style,
    label,
    required,
    error,
    labelPosition,
    autoWidth,
    htmlFor,
    children,
  } = props

  return (
    <div className={classnames(cn({ autoWidth }), className)} style={style}>
      <label className={cn('InputContainer', { labelPosition })} htmlFor={htmlFor}>
        <Text className={cn('Label', { labelPosition })}>
          {label}
          {label && required && (
            <Icon className={cn('RequiredIcon')} icon="required-field-marker" />
          )}
        </Text>
        {children}
      </label>

      {error && <Text className={cn('Message')}>{error}</Text>}
    </div>
  )
})

Field.defaultProps = {
  labelPosition: 'top',
} as Partial<FieldOwnProps>
