import { RoleType } from '@lib/connect/roles/interfaces/role'

export interface Connect {
  id: number
  email: string
  password: string
  status: string
  userName: string
  roles: RoleType[]
}
