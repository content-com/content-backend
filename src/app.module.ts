import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { CreatorModule } from './creator/creator.module';
import { ConnectionModule } from './connection/connection.module';
import { ContractModule } from './contract/contract.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { IntegrationModule } from './integration/integration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './libs/mail/mail.module';
import { GoogleModule } from './libs/google/google.module';
import APP_CONFIG from './config/app';
import DATABASE_CONFIG from './config/database';
import GOOGLE_CONFIG from './config/google';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG, DATABASE_CONFIG, GOOGLE_CONFIG],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get('database');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: entities,
          synchronize: true
        };
      },
      inject: [ConfigService]
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AdvertiserModule,
    CreatorModule,
    ConnectionModule,
    ContractModule,
    AnalyticsModule,
    IntegrationModule,
    AuthModule,
    UserModule,
    MailModule,
    GoogleModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {
  static port: number;
  constructor(configService: ConfigService) {
    const {
      api: { port: apiPort }
    } = configService.get('app');
    AppModule.port = apiPort;
  }
}
