import { Connect as ConnectType, UserType } from '@lib/profile/users/interfaces'
/**
 * @description Роли
 * @property admin - админ
 * @property visitor - посетитель
 * @property participant - участник
 */

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export interface RoleType {
  id: number
  value: RoleEnum
  description: string
  users: UserType[]
}
