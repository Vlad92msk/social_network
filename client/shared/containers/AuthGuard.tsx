import React, { FC, PropsWithChildren } from 'react'
import { GetUserInfoQuery } from '@my-apollo/generate'
import { LocalStorageEnum } from '@public/models/localStorage'
import { storageGet } from '@shared/utils'
import { PortfolioPages } from 'src/router/pages'
import { routesObject } from 'src/router/routes'
import { RoleEnum } from 'src/router/types'

export interface AuthGuardType {
  roles?: RoleEnum[]
  page?: PortfolioPages
}
export const AuthGuard: FC<PropsWithChildren<AuthGuardType>> = (props) => {
  const { roles, page, children } = props

  /**
   * Если пользователь попал на 404 страницу - пропустить
   * Если не указано имя страницы и роли доступа к ней - пропустить
   */
  if (page === PortfolioPages.ERROR_404 || !Boolean(roles && page)) return <>{children}</>


  const { allowRoles } = routesObject[page]

  /**
   * Если имя страницы указано (значит она есть в списке Роутов)
   * и в списке роутов для данной страницы указано "Посетитель" - пропустить
   */
  if (page && allowRoles.includes(RoleEnum.visitor)) return <>{children}</>


  const user = storageGet(LocalStorageEnum.CURRENT_USER) as GetUserInfoQuery['getOneUser']

  /* Если нет пользователя (не авторизован) - дальше проверять бессмысленно */
  if (!Boolean(user)) return <div>Недостаточно прав</div>

  const rolesInCurrentUser = user.connect.roles.map(({ value }) => value) as RoleEnum[]
  /**
   * Если имя страницы указано/не указано - не важно,
   * Но указаны роли
   * То берется инф о пользователе из Куков
   * Если у пользователя есть права указанные в ролях - пропустить
   */
  if (roles && rolesInCurrentUser.some((value) => roles.includes(value))) return <>{children}</>

  /**
   * Если Указано имя страницы
   * Но не указаны роли
   * То берется инф о пользователе из Куков
   * Берется список доступных ролей из списка Роутов
   * Если у пользователя есть права указанные в ролях - пропустить
   */
  if ((page && !roles) && rolesInCurrentUser.some((value) => allowRoles.includes(value))) return <>{children}</>

  /**
   * TODO: Потом как нибудь стилизовать
   */
  return <div>Недостаточно прав</div>
}
