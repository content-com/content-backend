import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics } from 'src/entities';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository]
})
export class AnalyticsModule {}
