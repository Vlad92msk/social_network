import { Module } from '@nestjs/common'
import { UserModule } from '@lib/profile/users/user.module'

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class ProfileModule {}
