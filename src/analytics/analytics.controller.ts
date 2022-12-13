import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAllAnalytics() {
    try {
      const analytics = await this.analyticsService.getAllAnalyitcs();
      return analytics;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getAnalytics(@Param('id', ParseIntPipe) analyticsId: number) {
    try {
      const analytics = await this.analyticsService.getAnalytics(analyticsId);
      if (!analytics) {
        throw new Error(`Analytics with id ${analyticsId} not found`);
      }
      return analytics;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteAnalytics(@Param('id', ParseIntPipe) analyticsId: number) {
    try {
      const deletedAnalytics = await this.analyticsService.deleteAnalytics(
        analyticsId
      );
      if (!deletedAnalytics) {
        throw new Error('Problem at deleting');
      }
      return deletedAnalytics;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
