import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { GraphQLError } from 'graphql'
import { sign, verify } from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { ConfigEnum } from '@config/config.enum'
import { Role } from '@lib/connect/roles/entities/role.entity'
import { tokenErrors } from '@lib/connect/tokens/errors'
import { StatusEnum, UserType } from '@lib/profile/users/interfaces'

import { Token } from './entities/token.entity'
import { TokenInput } from './inputs/create-token.input'

config()

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly configService: ConfigService
  ) {}

  /**
   * Генерация токена
   */
  generateToken(user: UserType): string {
    return sign(
      {
        id: user.id,
        status: user.connect.status,
        roles: user.connect.roles,
      },
      process.env.JWT_SECRET_KEY
    )
  }

  /**
   * Сохранение токена в БД
   */
  async saveToken(createUserToken: TokenInput) {
    try {
      const newToken = await this.tokenRepository.create(createUserToken)
      await this.tokenRepository.save(newToken)
      return newToken
    } catch {
      throw new GraphQLError(tokenErrors.SAVE)
    }
  }

  /**
   * Проверяет есть ли у пользователя токен
   */
  async exists(param: { uid: number; token: string }) {
    try {
      const findToken = await this.tokenRepository.findOne({
        where: param,
      })
      return findToken ?? findToken
    } catch {
      throw new GraphQLError(tokenErrors.EXISTS)
    }
  }

  /**
   * Подтверждение токена
   */
  verifyToken(token: string) {
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as {
        id: number
        status: StatusEnum
        roles: Role[]
      }
    } catch (error) {
      throw new GraphQLError(tokenErrors.VERIFY)
    }
  }

  /**
   * Удаляет токен у пользователя
   */
  async delete(uid: number, token?: string) {
    try {
      const where = token ? { uid, token } : { uid }
      const find = await this.tokenRepository.findOne({
        where,
      })
      if (!find) return

      return await this.tokenRepository.delete(find)
    } catch {
      throw new GraphQLError(tokenErrors.DELETE)
    }
  }
}
