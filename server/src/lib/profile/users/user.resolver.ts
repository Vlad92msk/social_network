import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { omit } from 'lodash'
import { AddUserRoleArgs, GetUserArgs, UpdateUserArgs } from './args'
import { RU_User } from './entities'
import { CreateUserInput } from './inputs'
import { UserService } from './user.service'

@Resolver(() => RU_User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //Query =================================

  @Query(() => RU_User, { description: 'Получить 1 пользователя' })
  async getOneUser(@Args({ nullable: true }) findUser?: GetUserArgs) {
    return await this.userService.findOneUserByParam(findUser)
  }

  @Query(() => [RU_User], { description: 'Получить всех пользователей' })
  async getAllUsers(@Args({ nullable: true }) findUser?: GetUserArgs): Promise<Partial<RU_User>[]> {
    try {
      return await this.userService.getAllUsers(findUser)
    } catch (e){
      console.log('e', e)
    }
  }

  // Mutation =================================

  @Mutation(() => RU_User, { description: 'Создать пользователя' })
  async usersCreate(@Args('user') user: CreateUserInput) {
    return await this.userService.createUser(user)
  }

  @Mutation(() => Boolean, { description: 'Дать пользователю новую роль' })
  async usersUpdateGiveNewRole(@Args() param: AddUserRoleArgs) {
    const { id } = param
    return await this.userService.updateUserRoles(id, omit(param, 'id'))
  }

  @Mutation(() => Boolean, { description: 'Удалить у пользователя имеющуюся роль' })
  async usersRemoveRole(
    @Args('userId') userId: number,
    @Args('roleId') roleId: number) {
    return await this.userService.deleteUserRoles(userId, roleId)
  }

  @Mutation(() => RU_User, { description: 'Обновить данные пользователя' })
  async usersUpdate(@Args() param: UpdateUserArgs) {
    const { id } = param
    return await this.userService.updateUser(id, omit(param, 'id'))
  }

  @Mutation(() => Number, { description: 'Удалить пользователя' })
  async removeUser(@Args('id') id: number) {
    return await this.userService.removeUser(id)
  }
}
