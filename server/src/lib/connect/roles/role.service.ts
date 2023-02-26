import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GraphQLError } from 'graphql'
import { Repository } from 'typeorm'
import { Role } from '@lib/connect/roles/entities/role.entity'
import { FindRoleInput } from '@lib/connect/roles/inputs/find-role.input'

import { CreateRoleInput } from './inputs/create-role.input'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  /**
   * Найти все роли
   */
  async getAllRoles() {
    return this.roleRepository.find({
      relations: ['users'],
    })
  }

  /**
   * Найти 1 роль по условию
   */
  async getRoleByValue(where: FindRoleInput, relations?: string[]) {
    return await this.roleRepository.findOne({
      where,
      relations,
    })
  }

  /**
   * Создать роль
   */
  async createRole(input: CreateRoleInput) {
    const found = await this.getRoleByValue(input)
    if (found) {
      throw new GraphQLError('Такая роль уже существует')
    }
    const newRole = this.roleRepository.create(input)
    return this.roleRepository.save(newRole)
  }

  /**
   * Удалить роль
   */
  async deleteRole(input: FindRoleInput) {
    const found = await this.getRoleByValue(input)
    if (!found) {
      throw new GraphQLError('Такой роли не существует')
    } else {
      await this.roleRepository.delete({ id: found.id })
      return found
    }
  }
}
