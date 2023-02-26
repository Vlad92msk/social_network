import { ArgsType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { UpdateUserRolesInput } from '../inputs'

@ArgsType()
export class AddUserRoleArgs {
  @Field()
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  id: number

  @Field()
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  rolesInput: UpdateUserRolesInput
}
