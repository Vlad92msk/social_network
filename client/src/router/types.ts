export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export type RouteParam = {
  readonly page: string
  readonly title: string
  readonly allowRoles: RoleEnum[]
  readonly subRoutes?: Record<RouteParam['page'], RouteParam>
};
/**
 * Наследование от содержимое роута, но без поля "subRoutes"
 */
export type RouteParamWithoutSubRoutes = Omit<RouteParam, 'subRoutes'>;
/**
 * Структура проекта ввиде объекта
 * Каждое свойтсво - отдельная папка Page
 */
export type ProjectNormalizeObject<T extends string> = Record<T, RouteParamWithoutSubRoutes>
