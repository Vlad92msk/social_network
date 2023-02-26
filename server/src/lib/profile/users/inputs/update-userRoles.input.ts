import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { enumMessage } from '@src/utils'
import { RoleEnum } from '@lib/connect/roles/interfaces/role'

@InputType()
export class UpdateUserRolesInput {
  @Field()
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  role: RoleEnum
}
