import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsString } from 'class-validator'
import { Personal } from '../interfaces'

@InputType({ description: 'Поиск пользователя по персональной информации' })
export class FindUserToPersonalInput implements Partial<Personal> {
  @Field({ description: 'Имя', nullable: true })
  @IsString()
  name?: string

  @Field({ description: 'Фамилия', nullable: true })
  @IsString()
  lastName?: string

  @Field({ description: 'Отчество', nullable: true })
  @IsString()
  patronymicName?: string

  @Field({ description: 'Пол', nullable: true })
  @IsString()
  gender?: string

  @Field({ description: 'Страна', nullable: true })
  @IsString()
  country?: string

  @Field({ description: 'Город', nullable: true })
  @IsString()
  city?: string

  @Field({ description: 'Гражданство', nullable: true })
  @IsString()
  nationality?: string

  @Field({ description: 'Гражданство', nullable: true })
  @IsDate()
  dateOfBirth?: Date
}
