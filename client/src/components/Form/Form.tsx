import React, { PropsWithChildren, useId } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReset } from 'react-hook-form'
import { UseFormProps } from 'react-hook-form/dist/types'

export interface FormProps<T extends FieldValues> extends PropsWithChildren {
  className?: string
  onSubmit: (data: T, callback?: UseFormReset<T>) => void
  formName?: string
  setup?: UseFormProps<T>
}

const DEFAULT_STATE: FieldValues = {}

export const Form = <T extends FieldValues = typeof DEFAULT_STATE, >(props: FormProps<T>) => {
  const { formName, onSubmit, setup, className, children } = props
  const methods = useForm(setup)
  const { handleSubmit, reset } = methods

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit((data) => {
          onSubmit(data, reset)
        })}
        id={formName || useId()}
      >
        {children}
      </form>
    </FormProvider>
  )
}
