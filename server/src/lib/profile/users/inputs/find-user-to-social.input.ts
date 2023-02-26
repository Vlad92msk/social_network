import { Field, InputType } from '@nestjs/graphql'
import { Social } from '../interfaces'

@InputType({ description: 'Поиск пользователя по социальной информации' })
export class FindUserToSocialInput implements Partial<Social> {
  @Field({ description: 'Друзья' })
  friends: string

  @Field({ description: 'Чаты' })
  chats: string

  @Field({ description: 'Подписчики' })
  subscribers: string

  @Field({ description: 'Подписки' })
  subscription: string
}
