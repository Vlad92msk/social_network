import { classnames } from '@bem-react/classnames'
import React, { useCallback } from 'react'
import { Text, TextSize } from '@shared/components/Text'
import { makeCn } from '@shared/utils'

import styles from 'src/components/AreaInput/AreaInput.module.scss'


const cn = makeCn('AreaInput', styles)


export interface AreaInputProps {
  className?: string
  style?: React.CSSProperties
  size?: TextSize
  name?: string
  value?: string
  placeholder?: string
  error?: any
  disabled?: boolean
  onChange?: (value: string, name?: string) => void
}


export const AreaInput: React.FC<AreaInputProps> = React.memo((props) => {
  const {
    className,
    style,
    size,
    name,
    value,
    placeholder,
    error,
    disabled,
    onChange,
  } = props


  const handleChange = useCallback(({ target: { value: newValue } }) => {
    onChange(newValue, name)
  }, [name, onChange])


  return (
    <div className={classnames(cn(), className)} style={style}>
      <Text
        as="textarea"
        color={disabled ? 'disabled' : 'inherit'}
        className={cn('Input', { error: !!error })}
        size={size}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
})


AreaInput.defaultProps = {
  className: null,
  placeholder: 'Введите комментарий...',
  size: '2',
}
