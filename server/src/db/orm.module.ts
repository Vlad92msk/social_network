import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { ConfigEnum } from '@config/config.enum'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: DataSource,
      useFactory: async (config: ConfigService) => {
        return new DataSource({
          ...config.get(ConfigEnum.ORM),
        }).initialize()
      },
    },
  ],
  exports: [DataSource],
})
export class OrmModule {}
