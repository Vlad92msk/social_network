import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities'
import { FindUserInput } from './inputs/find-user.input'

@Injectable()
export class UserTestService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    })
  }

  /**
   * Найти 1 юзера по условию
   */
  public findOneUserByParam = async (where?: FindUserInput) => {
    return await this.userRepository.findOne({ where })
  }

  public getAllUsers = async (where?: FindUserInput) => {
    return await this.userRepository.find({
      where: {
        id: where.id,
        personal: where,
      },
      relations: {
        personal: true,
      },
    })
  }
}
