import { PortfolioPages, ProjectStructureRoutes } from './pages'
import { RoleEnum } from './types'
import { createProjectRoutesData, currentProjectRoutesObject } from './utils'

export const PROJECT_ROUTES: Partial<ProjectStructureRoutes> = {
  [PortfolioPages.PROFILE]: {
    page: PortfolioPages.PROFILE,
    title: 'Профиль',
    allowRoles: [RoleEnum.participant],
  },
  [PortfolioPages.AUTH]: {
    page: PortfolioPages.AUTH,
    title: 'Авторизация',
    allowRoles: [RoleEnum.visitor],
  },
  [PortfolioPages.ERROR_404]: {
    page: PortfolioPages.ERROR_404,
    title: 'error_404',
    allowRoles: [RoleEnum.visitor],
  },
}


export const routesArray = createProjectRoutesData<Partial<ProjectStructureRoutes>>(PROJECT_ROUTES)
export const routesObject = currentProjectRoutesObject<PortfolioPages>(routesArray)
