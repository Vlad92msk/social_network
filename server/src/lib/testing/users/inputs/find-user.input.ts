import { Field, InputType } from '@nestjs/graphql'

@InputType({ description: 'ddd' })
export class FindUserInput {
  @Field({ nullable: true, name: 'id' })
  id?: number

  @Field({ nullable: true, name: 'name' })
  name: string

  @Field({ nullable: true, name: 'lastName' })
  lastName: string

  @Field({ nullable: true, name: 'patronymicName' })
  patronymicName: string

  @Field({ nullable: true, name: 'gender' })
  gender: string

  @Field({ nullable: true, name: 'country' })
  country: string

  @Field({ nullable: true, name: 'city' })
  city: string

  @Field({ nullable: true, name: 'nationality' })
  nationality: string
}
