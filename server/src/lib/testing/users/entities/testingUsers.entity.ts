import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'

import { UserPersonal } from './testingPersonal.entity'

@ObjectType({ description: 'Пользователь' })
@Entity(entity('testing_users'))
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => UserPersonal)
  @OneToOne(() => UserPersonal, (personal) => personal.user)
  @JoinColumn()
  personal: UserPersonal
}
