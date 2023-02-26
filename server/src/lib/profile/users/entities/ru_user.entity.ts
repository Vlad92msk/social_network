import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { entity } from '@utils/entity'
import { UserType } from '../interfaces'

import { Connect as ConnectEntity, RU_Personal as PersonalEntity, RU_Progress as ProgressEntity, RU_Social as SocialEntity } from './index'

export type UserTypeRelations = [keyof Omit<UserType, 'id'>]

@ObjectType({ description: 'Пользователь (ru)' })
@Entity(entity('ru_users'))
export class RU_User extends BaseEntity implements UserType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => ConnectEntity)
  @OneToOne(() => ConnectEntity, (connect) => connect.user, { cascade: true })
  @JoinColumn()
  connect: ConnectEntity

  @Field(() => PersonalEntity, { nullable: true })
  @OneToOne(() => PersonalEntity, (personal) => personal.user, { nullable: true, cascade: true })
  @JoinColumn()
  personal: PersonalEntity

  @Field(() => SocialEntity, { nullable: true })
  @OneToOne(() => SocialEntity, (social) => social.user, { nullable: true, cascade: true })
  @JoinColumn()
  social: SocialEntity

  @Field(() => ProgressEntity, { nullable: true })
  @OneToOne(() => ProgressEntity, (progress) => progress.user, { nullable: true, cascade: true })
  @JoinColumn()
  progress: ProgressEntity
}

export const userRelations = {
  social: true,
  connect: {
    roles: true,
  },
  personal: true,
  progress: true,
}

/**
 * type: 'varchar' - Для строк до 65535 символов
 * length: 30 - кол-во букв в строке (в т.ч пробелы)
 * width: 4 - кол-во цифр в числе
 */
