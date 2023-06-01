import React, { useEffect } from 'react'
import { Controller, ErrorOption, FieldValues, useFormContext, UseFormSetValue } from 'react-hook-form'
import { UseControllerProps } from 'react-hook-form/dist/types/controller'
import { getErrorMessage } from './utils/getErrorMessage'
import { Field, FieldOwnProps } from '../Field'


export interface FormControllerProps extends Omit<FieldOwnProps, 'error' | 'htmlFor' | 'required'> {
    name: string
    rules?: UseControllerProps['rules']
    children: React.ReactElement
    // onExternalChange?: (setValue: UseFormSetValue<FieldValues>) => void
}

export const FormController = (props: FormControllerProps) => {
  const { name, rules, children, ...rest } = props
  const { control, formState: { errors } } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Field
          {...rest}
          required={rules?.required}
          htmlFor={name}
          error={getErrorMessage(errors as ErrorOption, name)}
        >
          {React.cloneElement(children, {
            ...field,
            name: name.split('.')[name.split(('.')).length - 1],
            id: name,
            error: getErrorMessage(errors as ErrorOption, name),
            min: rules?.min,
            max: rules?.max,
            required: rules?.required,
          })}
        </Field>
      )}
    />
  )
}
