import { findKey, setWith } from 'lodash'
import { useMemo } from 'react'
import { GetKeys } from '@public/models/getObjectKeys'
import { findPathsToKey } from '@shared/utils/index'


/**
 * Устанавливает первоначальное значение
 * Берет defaultState
 * Если мы передали первоначальное значение - установит его
 * Если нет - будет использовано значение из defaultState
 * startValues - массив объектов с первоначальным значением
 */
export const startWith = <T extends Record<string, any>>(
  // @ts-ignore
  startValues?: Partial<Record<GetKeys<T>, any>>[],
  defaultState?: T,
): T => {
  if (!Boolean(startValues?.length && defaultState)) return defaultState

  return startValues.reduce((acc: T, item) => setWith(
    defaultState,
    findPathsToKey({ obj: defaultState, key: findKey(item) }),
    item[findKey(item)],
  ), defaultState)
}
