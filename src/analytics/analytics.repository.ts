import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Analytics } from 'src/entities';
import { ICreateAnalyticsInput } from 'src/common/interfaces/analytics';

@Injectable()
export class AnalyticsRepository extends Repository<Analytics> {
  constructor(dataSource: DataSource) {
    super(Analytics, dataSource.createEntityManager());
  }
  async createAndSave(
    createAnalyticsInput: ICreateAnalyticsInput,
    queryRunner?: QueryRunner
  ): Promise<Analytics> {
    const newAnalytics = this.create(createAnalyticsInput);
    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newAnalytics)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }
}
