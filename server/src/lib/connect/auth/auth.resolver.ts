import { UsePipes, ValidationPipe } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CookieOptions } from 'express'
import { GraphQLError } from 'graphql'
import { from } from 'rxjs'
import { Token } from '@lib/profile/users/decorators/user.decorator'
import { RU_User } from '@lib/profile/users/entities'
import { CreateUserInput } from '@lib/profile/users/inputs/create-user.input'

import { AuthService } from './auth.service'
import { SignInInput } from './inputs/signIn.input'
import { CookieEnum } from './types/cookie'

@Resolver(() => RU_User)
@UsePipes(new ValidationPipe())
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RU_User, { description: 'Зарегистрироваться' })
  authSignUp(@Args('user') createUserDto: CreateUserInput) {
    return from(this.authService.signUp(createUserDto))
  }

  @Query(() => RU_User, { description: 'Войти' })
  async authSignIn(@Context() context, @Token() userToken, @Args('signInInput') signInInput: SignInInput) {
    if (userToken) throw new GraphQLError('Пользователь уже авторизован. Для повторного входа необходимо выйти из системы.')

    const [user, token] = await this.authService.signIn(signInInput)
    const options: CookieOptions = {
      expires: new Date(Date.now() + 86400e3),
    }
    // context.res.cookie(CookieEnum.TOKEN, token, options)
    return user
  }

  @Mutation(() => Boolean, { description: 'Выйти' })
  async authSignOut(@Token() token, @Context() context) {
    if (!token) return false

    await this.authService.signOut(token)

    context.res.cookie(CookieEnum.TOKEN, token, {
      expires: new Date(Date.now() - 1),
    })

    return true
  }
}
