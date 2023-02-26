import { Connect as ConnectEntity, Personal as PersonalEntity, Progress as ProgressEntity, Social as SocialEntity } from './index'

export type UserType = {
  id: number
  connect: ConnectEntity
  personal: PersonalEntity
  social: SocialEntity
  progress: ProgressEntity
}
