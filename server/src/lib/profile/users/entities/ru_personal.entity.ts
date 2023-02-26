import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'

import { Personal as PersonalType } from '../interfaces/personal'
import { RU_User } from './ru_user.entity'

@ObjectType({ description: 'Персональная информация (ru)' })
@Entity(entity('ru_personal'))
export class RU_Personal extends BaseEntity implements PersonalType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: 'Имя', nullable: true })
  @Column({ name: 'name', type: 'varchar', length: 20, nullable: true })
  name: string

  @Field({ description: 'Фамилия', nullable: true })
  @Column({ name: 'lastName', type: 'varchar', length: 20, nullable: true })
  lastName: string

  @Field({ description: 'Отчество', nullable: true })
  @Column({ name: 'patronymicName', type: 'varchar', length: 20, nullable: true })
  patronymicName: string

  @Field({ description: 'Пол', nullable: true })
  @Column({ name: 'gender', type: 'varchar', length: 10, nullable: true })
  gender: string

  @Field({ description: 'Страна', nullable: true })
  @Column({ name: 'country', type: 'varchar', length: 20, nullable: true })
  country: string

  @Field({ description: 'Город', nullable: true })
  @Column({ name: 'city', type: 'varchar', length: 20, nullable: true })
  city: string

  @Field({ description: 'Гражданство', nullable: true })
  @Column({ name: 'nationality', type: 'varchar', length: 20, nullable: true })
  nationality: string

  @Field({ description: 'Гражданство', nullable: true })
  @Column({ name: 'dateOfBirth', type: 'date', nullable: true })
  dateOfBirth: Date

  @Field(() => RU_User)
  @OneToOne(() => RU_User, (user) => user.personal)
  user: RU_User
}
