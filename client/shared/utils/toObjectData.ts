import { DefaultObject } from '@public/models/defaultObject.model'

/**
 * @description - Массив объектов переводит в объект с клюем по элементу
 */
export const toObjectData = <T extends DefaultObject<any> = DefaultObject>(arr: T[], key = 'id'): DefaultObject<T> => (
  (arr || []).reduce((acc: DefaultObject<T>, item: T) => {
    acc[item[key] as string] = item
    return acc
  }, {})
)
