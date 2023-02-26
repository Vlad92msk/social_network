import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { addDays } from 'date-fns'
import { GraphQLError } from 'graphql'
import { ConfigEnum } from '@config/config.enum'
import { TokenService } from '@lib/connect/tokens/token.service'
import { CreateUserInput } from '@lib/profile/users/inputs/create-user.input'
import { StatusEnum, UserType } from '@lib/profile/users/interfaces'
import { UserService } from '@lib/profile/users/user.service'

import { SignInInput } from './inputs/signIn.input'

const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string

  constructor(private readonly userService: UserService, private readonly tokenService: TokenService, private readonly configService: ConfigService) {
    this.clientAppUrl = `http://${this.configService.get<string>(`${ConfigEnum.MAIN}.host`)}:${this.configService.get<string>(`${ConfigEnum.MAIN}.port`)}`
  }

  /**
   * Зарегистрироваться
   */
  async signUp(createUser: CreateUserInput) {
    const user = await this.userService.createUser(createUser)
    const confirmLink = await this.sendConfirmation(user)
    return [user, confirmLink]
  }

  /**
   * Отправить подтверждение
   */
  async sendConfirmation(user: UserType) {
    const expireAt = addDays(new Date(), 1)
    const token = this.tokenService.generateToken(user)
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`
    console.log(confirmLink)

    /**
     *Отправляет письмо на почту
     */
    // await this.mailService.send({
    // 	"from": this.configService.get<string>('JS_CODE_MAIL'),
    // 	to: email,
    // 	subject: 'Verify User',
    // 	text: `
    //             <h3>Hello ${name}!</h3>
    //             <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //         `,
    // });
    await this.tokenService.saveToken({
      token,
      uid: user.id,
      expireAt,
    })
    return confirmLink
  }

  /**
   * Войти
   */
  async signIn({ email, password }: SignInInput): Promise<[UserType, string]> {
    const user = await this.userService.findOneUserByParam({
      connect: { email },
    })

    if (user && (await bcrypt.compare(password, user.connect.password))) {
      if (user.connect.status !== StatusEnum.active) {
        throw new GraphQLError('Учетная запись не подтверждена')
      }
      /**
       * Удаляет из базы старый токен
       */
      await this.tokenService.delete(user.id)

      const token = await this.tokenService.generateToken(user)
      const expireAt = addDays(new Date(), 1)

      await this.tokenService.saveToken({
        token,
        expireAt,
        uid: user.id,
      })
      return [user, token]
    }
    throw new GraphQLError('Указаны неверные реквизиты учетной записи')
  }

  /**
   * Подтверждение регистрации пользователя по ссылке
   */
  async confirmRegistrationToLink(token: string) {
    const data = await this.confirmUserToken(token)
    const user = await this.userService.findOneUserByParam({
      id: data.id,
    })
    await this.tokenService.delete(data.id, token)

    if (user && user.connect.status === StatusEnum.pending) {
      try {
        return await this.userService.updateUser(user.id, {
          connect: { status: StatusEnum.active },
        })
      } catch (e) {
        console.log('e', e)
      }
    }
    throw new GraphQLError('Неверные данные')
  }

  /**
   * Подтверждает наличие токена у пользователя
   */
  async confirmUserToken(token: string) {
    const decodeTokenObject = this.tokenService.verifyToken(token)
    await this.tokenService.exists({
      uid: decodeTokenObject.id,
      token,
    })
    return decodeTokenObject
  }

  /**
   * Выйти
   */
  async signOut(token: string): Promise<boolean> {
    const decode = this.tokenService.verifyToken(token)
    await this.tokenService.delete(decode.id, token)
    return true
  }
}
