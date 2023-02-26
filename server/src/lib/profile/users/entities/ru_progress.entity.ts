import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'

import { Progress as ProgressType } from '../interfaces/progress'
import { RU_User } from './ru_user.entity'

@ObjectType({ description: 'Социальная информация (ru)' })
@Entity(entity('ru_progress'))
export class RU_Progress extends BaseEntity implements ProgressType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: 'Увлечения', nullable: true })
  @Column({ name: 'hobbies', type: 'varchar', length: 20, nullable: true })
  hobbies: string

  @Field({ description: 'Место учебы', nullable: true })
  @Column({ name: 'placeOfStudy', type: 'varchar', length: 20, nullable: true })
  placeOfStudy: string

  @Field({ description: 'Место работы', nullable: true })
  @Column({ name: 'employment', type: 'varchar', length: 20, nullable: true })
  employment: string

  @Field({ description: 'Владение языками', nullable: true })
  @Column({ name: 'workingLanguages', type: 'varchar', length: 20, nullable: true })
  workingLanguages: string

  @Field(() => RU_User)
  @OneToOne(() => RU_User, (user) => user.progress)
  user: RU_User
}
