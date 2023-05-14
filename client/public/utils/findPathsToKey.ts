export interface FindPathsToKey<T> {
  key: string
  obj: T
  pathToKey?: string
  searchInArrays?: boolean
}

/**
 * Выводит путь до указанного свойства в объекте
 */
export const findPathsToKey = <T extends Record<string, any>>(options: FindPathsToKey<T>): string => {
  const { key: optionKey, obj: optionObj, pathToKey: optionPathToKey = '', searchInArrays = false } = options // Деструктурируем новую опцию поиска внутри массивов
  const results: string[] = []

  // Вспомогательная рекурсивная функция для поиска пути
  const findKey = ({ key, obj, pathToKey }: FindPathsToKey<T>) => {
    const currentPath = pathToKey ? `${pathToKey}.` : '' // Текущий путь

    // Проверяем, содержит ли объект указанное свойство
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Если свойство найдено, добавляем путь в результаты
      results.push(`${currentPath}${key}`)
      return
    }

    // Проверяем, является ли свойство объектом
    if (typeof obj === 'object' && obj !== null) {
      // Перебираем все свойства объекта
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          const value = obj[prop]
          const newPath = `${currentPath}${prop}` // Путь к текущему свойству

          // Поиск пути внутри массивов
          if (searchInArrays && Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const arrayPath = `${newPath}[${i}]` // Путь к элементу массива
              findKey({ key, obj: value[i], pathToKey: arrayPath }) // Рекурсивный вызов для элемента массива
            }
          }

          // Рекурсивный вызов для вложенных объектов
          if (typeof value === 'object' && value !== null) {
            findKey({ key, obj: value, pathToKey: newPath })
          }
        }
      }
    }
  }

  // Запускаем поиск пути
  findKey({ key: optionKey, obj: optionObj, pathToKey: optionPathToKey })

  // Возвращаем первый найденный путь или пустую строку, если путь не найден
  return results[0] || ''
}


/**
 * Выводит путь до указанного свойства в объекте
 */
// export const findPathsToKey1 = <T extends Record<string, any>>(options: FindPathsToKey<T>): string => {
//   const results: string[] = [];
//
//   (function findKey({ key, obj, pathToKey }: FindPathsToKey<T>) {
//     const oldPath = `${pathToKey ? `${pathToKey}.` : ''}`
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       results.push(`${oldPath}${key}`)
//       return
//     }
//
//     if (isPlainObject(obj)) {
//       mapKeys(obj, (value, k) => {
//         if (Object.prototype.hasOwnProperty.call(obj, k)) {
//           const currentVal = obj[k]
//
//           /**
//            * Раскомментировать если нужно искать путь до свойств в объектах внутри массивов
//            * Пока что это не нужно
//            */
//           // if (isArray(currentVal)) {
//           //   range(size(currentVal)).forEach((j) => findKey({
//           //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//           //     obj: currentVal[String(j)],
//           //     key,
//           //     pathToKey: `${oldPath}${k}[${j}]`,
//           //   }));
//           // }
//
//           if (isPlainObject(currentVal)) {
//             findKey({
//               obj: currentVal,
//               key,
//               pathToKey: `${oldPath}${k}`,
//             })
//           }
//         }
//       })
//     }
//   }(options))
//
//   return results[0]
// }
