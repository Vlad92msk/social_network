import { RouteParam } from './types'

export enum PortfolioPages {
  AUTH = 'auth',
  ERROR_404 = 'error_404',
  PROFILE = 'profile',
}

/**
 * Роуты проекта
 */
export type ProjectStructureRoutes = Record<PortfolioPages, RouteParam>
