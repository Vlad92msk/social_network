import { classnames } from '@bem-react/classnames'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RefType } from '@public/types/refType'
import { rem } from '@public/utils'
import { cn } from './cn'
import { Text, TextOwnProps } from '../Text'


const useAutoSize = () => {
  const [height, setHeight] = useState<string | number | undefined>(rem(25))
  // const [width, setWidth] = useState('auto')

  const handleInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement
    setHeight(target.value.length > 0 ? rem(target.scrollHeight) : rem(25))
    // setWidth(`${event.target.scrollWidth}px`)
  }, [])

  return { height, handleInput }
}

export interface InputAreaProps extends TextOwnProps, Partial<Omit<HTMLTextAreaElement, 'size'>> {
  error?: boolean | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputArea = React.forwardRef((props: InputAreaProps, ref?: RefType<HTMLTextAreaElement>) => {
  const {
    className,
    error,
    ...rest
  } = props

  const { height, handleInput } = useAutoSize()

  return (
    // @ts-ignore
    <Text<'textarea'>
      ref={ref}
      {...rest}
      style={{ height }}
      className={classnames(className, cn('Area', { error: Boolean(error) }))}
      as="textarea"
      onInput={handleInput}
    />
  )
})
