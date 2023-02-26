/**
 * Получает все возможные пути к свойствам объекта (например 'a.b.c.d')
 */
export type GetObjectPaths<O extends Record<string, unknown>> = {
  [K in Extract<keyof O, string>]: O[K] extends Array<any> ? K : O[K] extends Record<string, unknown> ? `${K}` | `${K}.${GetObjectPaths<O[K]>}` : K
}[Extract<keyof O, string>]
