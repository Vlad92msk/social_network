import React from 'react'
import { useWatch } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormFieldConsumerProps {
  fieldName: string
  control?: Control<any>
  children: (value: { fieldValue: any }) => React.ReactNode
}

/**
 * Подписчик на конкретное значение из формы, позволяет взять из формы нужное значение и передать в children,
 * обернуть тот участок компоненты который необходимо обновить при изменении значения
 */
export const FormFieldConsumer: React.FC<FormFieldConsumerProps> = (props) => {
  const { fieldName, control, children } = props

  const fieldValue = useWatch({ name: fieldName, control })

  return (<>{children({ fieldValue })}</>)
}
