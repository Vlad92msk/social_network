import { get } from 'lodash'
import { ErrorOption } from 'react-hook-form'

/**
 * ПОлучаем текст ошибки из формы
 */
export const getErrorMessage = (errors: ErrorOption, path: string) => (
  get(errors, `${path}.message`)
)
