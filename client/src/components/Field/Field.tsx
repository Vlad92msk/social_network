import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren } from 'react'
import { PolymorphicComponentProps } from 'react-polymorphic-box'
import { Text } from '@common'
import { Icon } from '@public/components/Icon'
import { IconName } from '@public/types/icon.model'
import { makeCn } from '@public/utils'
import styles from './Field.module.scss'

const cn = makeCn('Field', styles)

export interface FieldOwnProps {
  className?: string
  classNameLabel?: string
  classNameErrorMessage?: string
  classNameRequired?: string
  requiredIcon?: IconName
  style?: React.CSSProperties
  label?: string
  required?: boolean
  error?: string
  labelPosition?: 'top' | 'right' | 'left'
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
    classNameErrorMessage,
    classNameLabel,
    classNameRequired,
    requiredIcon,
    children,
  } = props

  return (
    <div className={classnames(cn({ autoWidth }), className)} style={style}>
      <label className={cn('InputContainer', { labelPosition })} htmlFor={htmlFor}>
        <Text className={classnames(cn('Label', { labelPosition }), classNameLabel)}>
          {label}
          {label && required && (
            <Icon
              className={classnames(cn('RequiredIcon'), classNameRequired)}
              icon={requiredIcon!}
            />
          )}
        </Text>
        {children}
      </label>

      {error && (
      <Text className={classnames(cn('Message'), classNameErrorMessage)}>
        {error}
      </Text>
      )}
    </div>
  )
})

Field.defaultProps = {
  labelPosition: 'top',
  requiredIcon: 'required-field-marker',
} as Partial<FieldOwnProps>
