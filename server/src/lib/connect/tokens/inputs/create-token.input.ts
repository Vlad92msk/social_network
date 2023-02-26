import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TokenInput {
  @Field()
  token: string

  @Field()
  uid: number

  @Field()
  expireAt: Date
}
