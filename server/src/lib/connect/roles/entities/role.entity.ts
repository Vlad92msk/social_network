import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEnum, RoleType } from '@lib/connect/roles/interfaces/role'
import { Connect, RU_User } from '@lib/profile/users/entities'
import { entity } from '@utils/entity'

@ObjectType()
@Entity(entity('roles'))
export class Role extends BaseEntity implements RoleType {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Field({ description: 'Название роли' })
  @Column({ name: 'value', enum: RoleEnum })
  value: RoleEnum

  @Field({ description: 'Описание роли' })
  @Column({ name: 'description' })
  description: string

  @Field(() => [RU_User], { nullable: true })
  @ManyToMany(() => Connect, (user) => user.roles)
  users: RU_User[]
}
