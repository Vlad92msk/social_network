import { Args, Query, Resolver } from '@nestjs/graphql'

import { User } from './entities'
import { FindUserInput } from './inputs/find-user.input'
import { UserTestService } from './userTest.service'

@Resolver()
export class UserTestResolver {
  constructor(private readonly userService: UserTestService) {}

  @Query(() => User)
  async testing_getOneUser(@Args('id') id: number): Promise<User> {
    return await this.userService.getOneUser(id)
  }

  @Query(() => [User])
  async testing_getAllUsers(@Args('where', { nullable: true }) where?: FindUserInput): Promise<User[]> {
    return await this.userService.getAllUsers(where)
  }
}
