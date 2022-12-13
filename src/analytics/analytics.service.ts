import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytics } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>
  ) {}
  async getAllAnalyitcs(): Promise<Analytics[]> {
    const analytics = await this.analyticsRepository.find();
    return analytics;
  }

  async getAnalytics(id: number): Promise<Analytics> {
    const analytics = await this.analyticsRepository.findOne({
      where: { id }
    });
    return analytics;
  }

  async createAnalytics(
    createAnalyticsDto: CreateAnalyticsDto
  ): Promise<Analytics> {
    const newAnalytics = this.analyticsRepository.create(createAnalyticsDto);
    await this.analyticsRepository.save(newAnalytics);
    return newAnalytics;
  }

  async deleteAnalytics(id: number): Promise<Analytics> {
    const queryResult = await this.analyticsRepository
      .createQueryBuilder()
      .delete()
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
