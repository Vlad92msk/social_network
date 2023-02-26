import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { enumMessage } from '@src/utils'
import { CreateRole } from '../interfaces/createRole'

import { RoleEnum } from '../interfaces/role'

@InputType()
export class CreateRoleInput implements CreateRole {
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  @Field()
  value: RoleEnum

  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  description: string
}
