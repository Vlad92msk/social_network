import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'

import { User } from './testingUsers.entity'

@ObjectType({ description: 'Персональная инф' })
@Entity(entity('testing_users_personal'))
export class UserPersonal extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: 'Имя' })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 20,
    default: 'Влад',
  })
  name: string

  @Field({ description: 'Фамилия' })
  @Column({
    name: 'lastName',
    type: 'varchar',
    length: 20,
    default: 'Фирсов',
  })
  lastName: string

  @Field({ description: 'Отчество' })
  @Column({
    name: 'patronymicName',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'Сергеевич',
  })
  patronymicName: string

  @Field({ description: 'Пол' })
  @Column({
    name: 'gender',
    type: 'varchar',
    length: 10,
    nullable: true,
    default: 'М',
  })
  gender: string

  @Field({ description: 'Страна' })
  @Column({
    name: 'country',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'Россия',
  })
  country: string

  @Field({ description: 'Город' })
  @Column({
    name: 'city',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'Москва',
  })
  city: string

  @Field({ description: 'Гражданство' })
  @Column({
    name: 'nationality',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'РФ',
  })
  nationality: string

  @Field({ description: 'Гражданство' })
  @Column({
    name: 'dateOfBirth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date

  @Field(() => User)
  @OneToOne(() => User, (user) => user.personal)
  user: User
}
