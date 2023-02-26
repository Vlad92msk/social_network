import { isPlainObject, mapKeys } from 'lodash'

export interface FindPathsToKey<T> {
  key: string
  obj: T
  pathToKey?: string
}

/**
 * Выводит путь до указанного свойства в объекте
 */
export const findPathsToKey = <T extends Record<string, any>>(options: FindPathsToKey<T>): string => {
  const results: string[] = []

  ;(function findKey({ key, obj, pathToKey }: FindPathsToKey<T>) {
    const oldPath = `${pathToKey ? `${pathToKey}.` : ''}`
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      results.push(`${oldPath}${key}`)
      return
    }

    if (isPlainObject(obj)) {
      mapKeys(obj, (value, k) => {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          const currentVal = obj[k]

          /**
           * Раскомментировать если нужно искать путь до свойств в объектах внутри массивов
           * Пока что это не нужно
           */
          // if (isArray(currentVal)) {
          //   range(size(currentVal)).forEach((j) => findKey({
          //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          //     obj: currentVal[String(j)],
          //     key,
          //     pathToKey: `${oldPath}${k}[${j}]`,
          //   }));
          // }

          if (isPlainObject(currentVal)) {
            findKey({
              obj: currentVal,
              key,
              pathToKey: `${oldPath}${k}`,
            })
          }
        }
      })
    }
  })(options)

  return results[0]
}
