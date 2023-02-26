import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GraphQLError } from 'graphql'
import { remove } from 'lodash'
import { Repository } from 'typeorm'

import { tableOneToOneUpdate } from '@src/utils'
import { RoleEnum } from '@lib/connect/roles/interfaces/role'
import { RoleService } from '@lib/connect/roles/role.service'
import { AddUserRoleArgs } from '@lib/profile/users/args/add-user-role.args'
import { GetUserArgs, UpdateUserArgs } from './args'
import { Connect, RU_Personal, RU_Progress, RU_Social, RU_User, userRelations } from './entities'
import { CreateUserInput } from './inputs'
import { StatusEnum, UserType } from './interfaces'
import * as console from "console";

const bcrypt = require('bcryptjs')

@Injectable()
export class UserService {
  private readonly saltRounds = 10

  constructor(
    @InjectRepository(RU_User)
    private readonly userRepository: Repository<RU_User>,
    private readonly roleService: RoleService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return await bcrypt.hash(password, salt)
  }

  /**
   * Найти 1 пользователя по условию
   */
  public findOneUserByParam = async (where?: GetUserArgs) => {
    return await this.userRepository.findOne({
      where,
      relations: userRelations,
    })
  }

  /**
   * Обновить данные пользователя
   */
  public updateUser = async (id: number, newParams: Omit<UpdateUserArgs, 'id'>) => {
    const find = await this.findOneUserByParam({ id })
    if (!find) throw new GraphQLError('Пользователь не найден')

    try {
      return await tableOneToOneUpdate(newParams, find)
    } catch (e) {
      throw new GraphQLError('Ошибка обновления данных пользователя')
    }
  }

  /**
   * Добавить роль пользователю
   */
  public updateUserRoles = async (userId: number, { rolesInput }: Omit<AddUserRoleArgs, 'id'>): Promise<boolean> => {
    const findUser = await this.findOneUserByParam({ id: userId })
    if (!findUser) throw new GraphQLError('Потльзователь не найден')

    try {
      const findRole = await this.roleService.getRoleByValue({
        value: rolesInput.role,
      })

      if (findUser.connect.roles.some(({ id }) => id === findRole.id)) return true

      findUser.connect.roles.push(findRole)
      await findUser.save()
      return true
    } catch (e) {
      throw new GraphQLError('Ошибка добавления роли пользователю')
    }
  }

  /**
   * Удалить роль у пользователя
   */
  public deleteUserRoles = async (userId: number, roleId: number): Promise<boolean> => {
    const findUser = await this.findOneUserByParam({ id: userId })
    if (!findUser) throw new GraphQLError('Пользователь не найден')

    try {
      const findRole = await this.roleService.getRoleByValue({
        id: roleId,
      })
      if (!findUser.connect.roles.some(({ id }) => id === findRole.id)) return true

      findUser.connect.roles = remove(findUser.connect.roles, ({ id }) => findRole.id !== id)
      await findUser.save()
      return true
    } catch {
      throw new GraphQLError('Ошибка удаления роли у пользователя')
    }
  }

  /**
   * Создать юзера
   */
  public createUser = async (createUsersInput: CreateUserInput): Promise<UserType> => {
    const found = await this.findOneUserByParam({
      connect: {
        userName: createUsersInput.name,
        email: createUsersInput.email,
      },
    })
    if (found) throw new GraphQLError('Пользователь уже существует')

    try {
      const hash = await this.hashPassword(createUsersInput.password)
      const role = await this.roleService.getRoleByValue({ value: RoleEnum.visitor })

      console.log(hash)
      console.log(role)
      const userConnect = await Connect.create({
        userName: createUsersInput.name,
        email: createUsersInput.email,
        password: hash,
        roles: [role],
        status: StatusEnum.pending,
      }).save()
      const userPersonal = await RU_Personal.create()
      const userSocial = await RU_Social.create()
      const userProgress = await RU_Progress.create()

      const newUser = await RU_User.create({
        connect: userConnect,
        personal: userPersonal,
        social: userSocial,
        progress: userProgress,
      }).save()

      console.log(newUser)
      return newUser
    } catch (e) {
      throw new GraphQLError('Ошибка создания пользователя')
    }
  }

  /**
   * Удалить юзера
   */
  public deleteUser = async (userParam: GetUserArgs) => {
    const found = await this.findOneUserByParam(userParam)
    if (!found) throw new GraphQLError('Пользователь не найден')

    try {
      return await this.userRepository.delete({
        id: found.id,
      })
    } catch {
      throw new GraphQLError('Ошибка удаления пользователя')
    }
  }

  public getAllUsers = async (where?: GetUserArgs) => {
    return await this.userRepository.find({
      where,
      relations: userRelations,
    })
  }

  async removeUser(id: number) {
    await this.userRepository.delete({ id })
    return id
  }
}
