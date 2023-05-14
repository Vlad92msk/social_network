import { classnames } from '@bem-react/classnames'
import React, { ElementType, useCallback } from 'react'
import { Icon, IconProps } from 'public/components/Icon'

import { makeCn } from 'public/utils'
import { Text } from 'src/components/Text'
import styles from './AreaInput.module.scss'


const cn = makeCn('AreaInput', styles)


export interface AreaInputProps {
  className?: string
  style?: React.CSSProperties
  maxWidth?: string
  name?: string
  value?: string
  placeholder?: string
  error?: any
  disabled?: boolean
  onChange?: (value: string, name?: string) => void
  anchorEl?: React.Ref<any>
  icon?: IconProps
  iconClear?: IconProps
  inputClassName?: string
  onIconClear?: () => void
}

export const AreaInput: React.FC = React.memo((props: AreaInputProps) => {
  const {
    className,
    style,
    name,
    value,
    placeholder,
    error,
    disabled,
    onChange,
    maxWidth,
    anchorEl,
    icon,
    inputClassName,
    iconClear,
    onIconClear,
  } = props

  const handleChange = useCallback(({ target: { value: newValue } }) => {
    onChange?.(newValue, name)
  }, [name, onChange])

  return (
    <div className={classnames(cn(), className)} style={{ ...style, alignItems: icon && 'center' }}>
      {icon && (<Icon {...icon} />)}
      {(iconClear && value?.length) ? (
        <Icon className={cn('IconClear')} {...iconClear} onClick={onIconClear} />) : null}
      <Text<'textarea'>
        as="textarea"
        ref={anchorEl}
        className={classnames(cn('Input'), inputClassName)}
        style={{
          maxWidth,
          marginLeft: icon && '5px',
        }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
}, (a, b) => a.value === b.value)


AreaInput.defaultProps = {
  placeholder: 'Введите значение...',
}
