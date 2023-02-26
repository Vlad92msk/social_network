import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { loadEntities } from '@src/utils'

import * as databases from './entities'
import { RoleResolver } from './role.resolver'
import { RoleService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature(loadEntities(databases))],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
