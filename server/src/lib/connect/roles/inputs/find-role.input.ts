import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNumber, IsString } from 'class-validator'
import { enumMessage } from '@src/utils'
import { FindRole } from '@lib/connect/roles/interfaces/findRole'
import { RoleEnum } from '@lib/connect/roles/interfaces/role'

@InputType()
export class FindRoleInput implements FindRole {
  @IsNumber()
  @Field({ nullable: true })
  id?: number

  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  @Field({ nullable: true })
  value?: RoleEnum

  @IsString({ message: 'Значение должно быть строкой' })
  @Field({ nullable: true })
  description?: string
}
