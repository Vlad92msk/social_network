import { RoleEnum } from '@lib/connect/roles/interfaces/role'

export interface FindRole {
  id?: number
  value?: RoleEnum
  description?: string
}
