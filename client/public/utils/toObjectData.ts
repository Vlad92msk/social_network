import { DefaultObject } from '@public/types/defaultObject.model'

/**
 * @description - Массив объектов переводит в объект с клюем по элементу
 */
export const toObjectData = <T extends DefaultObject<any> = DefaultObject>(arr: T[], key = 'id'): Record<typeof key, T> => (
  (arr || []).reduce((acc: Record<typeof key, T>, item: T) => {
    acc[item[key] as string] = item
    return acc
  }, {})
)
