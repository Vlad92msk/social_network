import { classnames } from '@bem-react/classnames'
import React, { useCallback, useEffect, useRef } from 'react'
import { makeCn } from '@shared/utils/makeCn'

import styles from './Textarea.module.scss'

const cn = makeCn('Textarea', styles)


export interface TextareaProps {
  className?: string
  styleReset?: boolean
  isAutoHeight?: boolean
  maxLength?: number
  disabled?: boolean
  placeholder?: string
  name?: string
  value: string
  onChange: (value: string, name: string) => void
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    value,
    onChange,
    maxLength,
    placeholder,
    disabled,
    isAutoHeight,
    styleReset,
    className,
    ...restProps
  } = props

  const textarea = useRef<HTMLTextAreaElement>(null)

  const handleHeightChange = useCallback(() => {
    if (!isAutoHeight || !textarea.current) return
    const textareaElem = textarea.current
    textareaElem.style.height = '0px'
    const trackedHeight = textareaElem.scrollHeight
    textareaElem.style.height = `calc(0.5em + ${trackedHeight}px)`
  }, [isAutoHeight])

  const handleChange = useCallback(({ currentTarget }) => {
    onChange(currentTarget.value, currentTarget.name)
  }, [onChange, handleHeightChange])

  useEffect(() => {
    if (isAutoHeight) handleHeightChange()
  }, [placeholder, value, handleHeightChange])

  return (
    <textarea
      ref={textarea}
      maxLength={maxLength}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={classnames(cn({ styleReset }), 'form__input w-input', className)}
      {...restProps}
    />
  )
}

Textarea.defaultProps = {
  value: '',
}
