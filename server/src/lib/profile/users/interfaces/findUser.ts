import { Connect } from '@lib/profile/users/interfaces/connect'
import { Personal } from '@lib/profile/users/interfaces/personal'
import { Progress } from '@lib/profile/users/interfaces/progress'
import { Social } from '@lib/profile/users/interfaces/social'

export type FindOneUser = {
  id?: number
  connect?: Partial<Connect>
  personal?: Partial<Personal>
  social?: Partial<Social>
  progress?: Partial<Progress>
}
