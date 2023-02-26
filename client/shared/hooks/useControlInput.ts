import React, { useCallback, useEffect, useMemo } from 'react'
import { ControllerFieldState, useController, useFormContext, UseFormUnregister } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export type ControllerFieldStatePartial = Partial<ControllerFieldState>
export interface ControlFieldState extends ControllerFieldStatePartial {
  value: any
  isFocus: boolean
}
export type ControlFieldStatePartial = Partial<ControlFieldState>
export declare type ControlFieldsState = Record<string, ControlFieldStatePartial>

export interface IControlInputParams {
  name: string
  control?: Control<any>
  defaultValue?: any
  rules?: RegisterOptions
  recorder?: RegExp | ((value: any) => string);
  validator?: ((value: any) => string | React.ReactNode | React.ReactNodeArray)
  setFieldState?: React.Dispatch<React.SetStateAction<ControlFieldsState>>
  onChange?: (value: any, name?: string) => void
  unregister?: UseFormUnregister<any> | boolean
}

export interface IControlInputReturn {
  inputProps: {
    name: string
    value: any
    onChange: (value: any, name?: string) => void
    onBlur: () => void
    onFocus: () => void
  };
  fieldState?: Partial<ControllerFieldState>
  validationError?: string | React.ReactNode | React.ReactNodeArray
}

/**
 * @description Универсальный хук для создания инпута обернутого в контроллер.
 * Обертка позволяет хранить состояние значение инпута внутри инпута
 * Получать состояние инпута из любого места через useWatch или функцию сета стейта setFieldState
 * Для создания изолированной формы необходимо воспользоваться useForm и прокинуть control,
 * тогда состояние инпута будет доступно только внутри этой формы
 * Состояние очищается при демонтировании инпута
 * Валидация осуществляется через rules
 *
 * @param {string} name - name инпута
 * @param {Control} control - Обязателен только если необходимо создать изолированную форму
 * @param {any} defaultValue - Значение по умолчанию
 * @param {RegisterOptions} rules - Параметры валидации
 * @param {RegExp | Function} recorder - Переписывает value при изменении
 * @param {Function} validate - Функция валидации
 * @param {React.Dispatch} setFieldState - Функция фиксации состояния инпута
 * @param {Function} onChange - Функция изменения значения
 */
export const useControlInput = (
  {
    name,
    control,
    defaultValue = '',
    rules = {},
    recorder,
    validator,
    setFieldState,
    onChange,
    unregister,
  }: IControlInputParams,
): IControlInputReturn => {
  const { unregister: unregisterContext } = (useFormContext() || {})

  /**
   * Функция определения валидная ли форма
   */
  const handleRulesValidate = useCallback((value): null | boolean | string => (
    (rules.validate as Function)?.(value) || validator?.(value) || null
  ), [rules.validate, validator])

  /**
   * Создается контрол инпута
   * @property field - Хранит необходимые параметры для контролирования инпута
   * @property fieldState - Хранит состояния в основном необходимые для валидации
   * @property formState - Хранит общее состояние формы (лучше использовать useFormContext или useForm)
   */
  const {
    field: { ref, value, onChange: onChangeValue, onBlur, ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({
    name,
    control,
    defaultValue,
    rules: {
      ...rules,
      validate: handleRulesValidate,
    },
  })

  /**
   * Если была передана функция фиксации состояния инпута, то при изменении, передавать в эту функцию актуальное состояние
   */
  const handleValueFieldStateSet = useCallback((data: ControlFieldStatePartial) => {
    setFieldState?.((prev) => {
      const newState = { ...prev, [name]: { ...prev[name], ...data } }
      if (JSON.stringify(newState) !== JSON.stringify(prev)) return newState
      return prev
    })
  }, [name, setFieldState])

  /**
   * Применение состояния инпута из общей формы
   */
  useEffect(() => {
    handleValueFieldStateSet({ value, invalid, isTouched, isDirty, error })
  }, [value, invalid, isTouched, isDirty, error, handleValueFieldStateSet])

  /**
   * Ресет инпута при демонтировании
   */
  useEffect(() => () => {
    // setValue(name, '', { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    if (unregister) {
      typeof unregister === 'function' ? unregister(name) : unregisterContext?.(name)
    }
  }, [name, unregister, unregisterContext])

  /**
   * Функция изменения значения
   */
  const handleChange = useCallback((value: string, name?: string) => {
    const newValue = recorder ? (typeof recorder === 'function' ? recorder(value) : value.replace(recorder, '')) : value
    onChange?.(newValue, name)
    onChangeValue(newValue)
  }, [onChange, onChangeValue, recorder])

  /**
   * Событие фокуса на инпут
   */
  const handleFocus = useCallback(() => {
    handleValueFieldStateSet({ isFocus: true })
  }, [handleValueFieldStateSet])

  const handleBlur = useCallback(() => {
    onBlur()
    handleValueFieldStateSet({ isFocus: false })
  }, [onBlur, handleValueFieldStateSet])


  /**
   * При изменении value запускается переданная функция валидации
   */
  const validationError = useMemo(() => validator?.(value), [value, validator])

  return ({
    inputProps: {
      ...inputProps,
      value: value ?? defaultValue,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
    },
    fieldState: { invalid, isTouched, isDirty, error },
    validationError,
  })
}
