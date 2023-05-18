import { classnames } from '@bem-react/classnames'
import React, { ChangeEvent } from 'react'
import { RefType } from '@public/types/refType'
import { makeCn } from '@public/utils'
import styles from './InputText.module.scss'
import { Text, TextOwnProps } from '../Text'


const cn = makeCn('TextInput', styles)

export interface InputTextProps extends TextOwnProps {
  error?: boolean | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputArea = React.forwardRef((props: InputTextProps & Partial<HTMLTextAreaElement>, ref?: RefType<HTMLTextAreaElement>) => {
  const {
    className,
    placeholder = '...',
    error,
    ...rest
  } = props

  return (
    // @ts-ignore
    <Text<'textarea'>
      ref={ref}
      {...rest}
      className={classnames(className, cn('Input', { error: Boolean(error) }))}
      placeholder={placeholder}
      as="textarea"
    />
  )
})
