import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'

import { Social as SocialType } from '../interfaces/social'
import { RU_User } from './ru_user.entity'

@ObjectType({ description: 'Социальная информация (ru)' })
@Entity(entity('ru_social'))
export class RU_Social extends BaseEntity implements SocialType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: 'Друзья', nullable: true })
  @Column({ name: 'friends', nullable: true })
  friends: string

  @Field({ description: 'Чаты', nullable: true })
  @Column({ name: 'chats', nullable: true })
  chats: string

  @Field({ description: 'Подписчики', nullable: true })
  @Column({ name: 'subscribers', nullable: true })
  subscribers: string

  @Field({ description: 'Подписки', nullable: true })
  @Column({ name: 'subscription', nullable: true })
  subscription: string

  @Field(() => RU_User)
  @OneToOne(() => RU_User, (user) => user.social)
  user: RU_User
}
