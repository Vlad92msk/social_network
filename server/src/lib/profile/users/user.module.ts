import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { loadEntities } from '@src/utils'
import { Role } from '@lib/connect/roles/entities'
import { RoleModule } from '@lib/connect/roles/role.module'
import { RoleService } from '@lib/connect/roles/role.service'
import * as databases from './entities'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([...loadEntities(databases), Role]), RoleModule],
  providers: [UserService, UserResolver, RoleService],
  exports: [UserService],
})
export class UserModule {}
