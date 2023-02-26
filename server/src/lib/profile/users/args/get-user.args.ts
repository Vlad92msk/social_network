import { ArgsType, Field } from '@nestjs/graphql'
import { FindUserToConnectInput, FindUserToPersonalInput, FindUserToProgressInput, FindUserToSocialInput } from '../inputs'

@ArgsType()
export class GetUserArgs {
  @Field({ nullable: true })
  id?: number

  @Field({ nullable: true })
  connect?: FindUserToConnectInput

  @Field({ nullable: true })
  personal?: FindUserToPersonalInput

  @Field({ nullable: true })
  social?: FindUserToSocialInput

  @Field({ nullable: true })
  progress?: FindUserToProgressInput
}
