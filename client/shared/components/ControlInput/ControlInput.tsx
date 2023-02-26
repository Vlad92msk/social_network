import React, { useMemo } from 'react'
import { Text } from '@shared/components/Text'
import { ControllerFieldStatePartial, IControlInputParams, useControlInput } from '@shared/hooks/useControlInput'
import { makeCn } from '@shared/utils'
import styles from './ControlInput.module.scss'

const cn = makeCn('ControlInput', styles)


export declare interface IControlInput extends IControlInputParams {
  errorComponent?: ((fieldState?: ControllerFieldStatePartial) => React.ReactNode | React.ReactNodeArray)
    | React.FC<ControllerFieldStatePartial>;
  showErrorWithoutTouched?: boolean;
}

export interface ControlInputProps extends IControlInput {
  Input?: React.FC<Record<string, any>>;
}

export const ControlInput: React.FC<ControlInputProps> = (props) => {
  const {
    Input, errorComponent, showErrorWithoutTouched,
    control, defaultValue, name, rules, recorder, validator, onChange, unregister,
    ...rest
  } = props

  const { inputProps, fieldState, validationError } = useControlInput({
    name, control, defaultValue, rules, recorder, validator, onChange, unregister,
  })

  /**
   * Нахождение ошибки - отрисовка
   */
  const fieldError = useMemo(() => {
    if (errorComponent) {
      const errorComponentRender = errorComponent?.(fieldState)
      return ({ isError: !!errorComponentRender, errorRender: errorComponentRender })
    }

    const { isTouched, error } = fieldState
    const errorMessage = (showErrorWithoutTouched || isTouched) && (validationError || error?.message || !!error)

    return ({
      isError: !!errorMessage,
      errorRender: errorMessage && (
        <Text className={cn('ErrorMessage')} size="3">
          {errorMessage}
        </Text>
      ),
    })
  }, [errorComponent, showErrorWithoutTouched, validationError, fieldState])

  return (
    <>
      <Input {...rest} {...inputProps} error={fieldError.isError} />
      {fieldError.errorRender}
    </>
  )
}
