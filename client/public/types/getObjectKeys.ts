/**
 * Получает все ключи объекта
 */
type RecursiveKeyof<T> = T extends Record<string, unknown> ? (
  T extends readonly any[] ? RecursiveKeyof<T[number]> : (
    keyof T | RecursiveKeyof<T[keyof T]>
    )
  ) : string

export type GetKeys<T> = RecursiveKeyof<T>
