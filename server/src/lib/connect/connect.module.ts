import { Module } from '@nestjs/common'
import { AuthModule } from '@lib/connect/auth/auth.module'
import { RoleModule } from '@lib/connect/roles/role.module'
import { TokenModule } from '@lib/connect/tokens/token.module'

@Module({
  imports: [RoleModule, TokenModule, AuthModule],
  exports: [RoleModule, TokenModule, AuthModule],
})
export class ConnectModule {}
