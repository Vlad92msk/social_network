import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { Progress } from '../interfaces'

@InputType({ description: 'Поиск пользователя по уровню развития' })
export class FindUserToProgressInput implements Partial<Progress> {
  @Field({ description: 'Увлечения', nullable: true })
  @IsString()
  hobbies?: string

  @Field({ description: 'Место учебы', nullable: true })
  @IsString()
  placeOfStudy?: string

  @Field({ description: 'Место работы', nullable: true })
  @IsString()
  employment?: string

  @Field({ description: 'Владение языками', nullable: true })
  @IsString()
  workingLanguages?: string
}
