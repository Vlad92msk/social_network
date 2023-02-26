import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from '@lib/connect/tokens/token.module'
import { UserModule } from '@lib/profile/users/user.module'

import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth-guard'

@Module({
  imports: [ConfigModule, UserModule, TokenModule],
  providers: [AuthService, AuthResolver, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
