import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CreatorModule } from 'src/creator/creator.module';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { IntegrationController } from './integration.controller';
import { IntegrationRepository } from './integration.repository';
import { IntegrationService } from './integration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    AuthModule,
    CreatorModule,
    AnalyticsModule
  ],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationRepository,
    GoogleService,
    CreatorRepository,
    AnalyticsRepository
  ]
})
export class IntegrationModule {}
