import React, { useCallback } from 'react'

export declare type CheckListWrapValue = (string | number)[];

export interface CheckListWrapParams {
  value: CheckListWrapValue
  onChange: (value: boolean, name: string | number) => void
}

export interface CheckListWrapProps {
  children: (value: CheckListWrapParams) => React.ReactNode | React.ReactNodeArray
  name?: string
  value: CheckListWrapValue
  onChange: (value: CheckListWrapValue, name: string) => void
}

export const CheckListWrap: React.FC<CheckListWrapProps> = (props) => {
  const { children, name, value, onChange } = props

  const handleChange = useCallback((checked: boolean, newValue: string | number) => {
    const valueArr = Array.isArray(value) ? value : []
    onChange(checked ? [...valueArr, newValue] : valueArr.filter((item) => item !== newValue), name)
  }, [value, name, onChange])

  return (
    <>
      {children({ value, onChange: handleChange })}
    </>
  )
}
