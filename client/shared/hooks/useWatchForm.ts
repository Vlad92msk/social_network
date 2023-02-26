import { useCallback, useEffect } from 'react'
import { DeepPartial, FieldErrors, UnpackNestedValue, UseFormWatch } from 'react-hook-form/dist/types'
import { useDebounce } from './useDebounce'

/**
 * @description Параметры которые получает функция обновления
 * @property value - Новое значение всей формы
 * @property name - Полное имя указанное в контроле
 * @property firstName - Имя до первой точки, в имени указанном в контроле
 * @property currentValue - Только изменяемое значение в форме
 */
export declare interface FnUpdateParams<T = object> {
  value: UnpackNestedValue<DeepPartial<T>>;
  name: string;
  firstName: keyof T;
  currentValue: Partial<T>;
}

export declare interface UseWatchFormParams<T = object> {
  watch: UseFormWatch<T>;
  errors?: FieldErrors;
  onUpdate: (value: FnUpdateParams<T>) => void;
  delay?: number;
}

/**
 * @description Хук наблюдатель за формой, вызывающий функцию обновление через дебаунс после каждого изменения формы
 * @param watch - Параметр watch из useForm
 * @param errors - Параметр errors из useForm
 * @param onUpdate - Функция вызывающаяся при изменении формы
 * @param delay - Задержка дебаунса
 */
export const useWatchForm = <T = object>({ watch, errors, onUpdate, delay = 500 }: UseWatchFormParams<T>) => {
  const handleUpdate = useCallback((value: UnpackNestedValue<DeepPartial<T>>, name: string) => {
    if (!name) return
    const firstName = name.split('.')[0]

    /**
     * Если нет ошибок, то вызвать функцию обновления
     */
    if (!errors?.[firstName]) {
      onUpdate({
        value,
        name,
        firstName: firstName as keyof T,
        currentValue: { [firstName]: value[firstName] } as Partial<T>,
      })
    }
  }, [errors, onUpdate])

  const debouncedUpdate = useDebounce(handleUpdate, delay)

  /**
   * Подписка на изменение формы
   */
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // @ts-ignore
      debouncedUpdate(value, name)
    })
    return () => subscription.unsubscribe()
  }, [watch, debouncedUpdate])
}
