import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '@lib/connect/roles/entities/role.entity'
import { entity } from '@utils/entity'

import { Connect as ConnectType } from '../interfaces/connect'
import { RU_User } from './ru_user.entity'

@ObjectType({ description: 'Инф о подключении' })
@Entity(entity('connect'))
export class Connect extends BaseEntity implements ConnectType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: 'Чей токен' })
  @Column({ name: 'userName' })
  userName: string

  @Field({ description: 'Пароль' })
  @Column({ name: 'password' })
  password: string

  @Field({ description: 'Почта' })
  @Column({ name: 'email', unique: true })
  email: string

  @Field({ description: 'Статус' })
  @Column({ name: 'status' })
  status: string

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role, (role) => role.users, {
    cascade: ['update', 'insert', 'remove', 'soft-remove'],
    nullable: true,
  })
  @JoinTable()
  roles: Role[]

  @Field(() => RU_User)
  @OneToOne(() => RU_User, (user) => user.connect)
  user: RU_User
}
