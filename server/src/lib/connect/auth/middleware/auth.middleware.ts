import { Injectable, NestMiddleware } from '@nestjs/common'
import { differenceInMinutes, parseISO } from 'date-fns'
import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { getNestCookie } from '@src/utils'
import { CookieEnum } from '@lib/connect/auth/types/cookie'
import { TokenService } from '@lib/connect/tokens/token.service'
import { UserService } from '@lib/profile/users/user.service'

config()

export enum AuthStatus {
  tokenDead,
  userUnAuthorisation,
  noUser,
  ok,
}

export interface ExpressRequest extends Request {
  status: AuthStatus
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const getCookie = req.headers.cookie
    const requestCookieToken = getCookie ? getNestCookie(CookieEnum.TOKEN, getCookie) : null

    if (!requestCookieToken) {
      req.status = AuthStatus.userUnAuthorisation
      next()
      return
    }
    const decode = await this.tokenService.verifyToken(requestCookieToken)

    const { expireAt } = await this.tokenService.exists({
      uid: decode.id,
      token: requestCookieToken,
    })
    const tokenExpireAt = expireAt
    const now = new Date()
    const difference = differenceInMinutes(tokenExpireAt, now)

    /**
     * Время токена истекло
     */
    if (difference < 0) {
      await this.tokenService.delete(decode.id, requestCookieToken)
      req.status = AuthStatus.tokenDead
      next()
      return
    }

    const user = await this.userService.findOneUserByParam({
      id: decode.id,
    })

    /**
     * Пользователь с данным токеном не найден
     */
    if (!user) {
      req.status = AuthStatus.noUser
      next()
      return
    }

    req.status = AuthStatus.ok
    next()
  }
}
