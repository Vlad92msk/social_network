import { Module } from '@nestjs/common'
import { UserTestModule } from '@lib/testing/users/userTest.module'

@Module({
  imports: [UserTestModule],
  exports: [UserTestModule],
})
export class TestingModule {}
