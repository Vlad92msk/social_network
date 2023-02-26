import React from 'react'
import { useFormState } from 'react-hook-form'
import { Control, FieldValues, UseFormStateReturn } from 'react-hook-form/dist/types'

export interface FormDataConsumerProps {
  control?: Control<any>
  children: (value: { formState: UseFormStateReturn<FieldValues> }) => React.ReactNode
}

/**
 * Подписчик на конкретное значение из формы, позволяет взять из формы нужное значение и передать в children,
 * обернуть тот участок компоненты который необходимо обновить при изменении значения
 */
export const FormDataConsumer: React.FC<FormDataConsumerProps> = (props) => {
  const { control, children } = props

  const formState = useFormState({ control })

  return (<>{children({ formState })}</>)
}
