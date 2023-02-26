import { Field, InputType } from '@nestjs/graphql'

import { Connect } from '../interfaces'

@InputType({ description: 'Поиск пользователя по авторизационным данным' })
export class FindUserToConnectInput implements Partial<Connect> {
  @Field({ nullable: true })
  userName?: string

  @Field({ nullable: true })
  status?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  id?: number

  @Field({ nullable: true })
  email?: string
}
