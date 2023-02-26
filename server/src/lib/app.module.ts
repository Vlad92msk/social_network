import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import mainConfig from '@config/main.config'
import baseOrmConfig from '@config/orm.config'
import { GQLModule } from '@db/gql.module'
import { OrmModule } from '@db/orm.module'
import { AuthMiddleware } from '@lib/connect/auth/middleware/auth.middleware'
import { ConnectModule } from '@lib/connect/connect.module'
import { ProfileModule } from '@lib/profile/profile.module'
import { TestingModule } from '@lib/testing/testing.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mainConfig, baseOrmConfig],
      isGlobal: true,
      envFilePath: '../.env',
    }),
    GQLModule,
    OrmModule,
    ConnectModule,
    ProfileModule,
    TestingModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
