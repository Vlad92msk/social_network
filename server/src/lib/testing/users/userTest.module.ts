import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { loadEntities } from '@src/utils'
import { UserTestResolver } from '@lib/testing/users/userTest.resolver'
import { UserTestService } from '@lib/testing/users/userTest.service'

import * as databases from './entities'

@Module({
  imports: [TypeOrmModule.forFeature(loadEntities(databases))],
  providers: [UserTestService, UserTestResolver],
})
export class UserTestModule {}
