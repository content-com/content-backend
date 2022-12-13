import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Advertiser } from 'src/entities';
import {
  ICreateAdvertiserInput,
  IUpdateAdvertiserInput
} from 'src/common/interfaces/advertiser';

@Injectable()
export class AdvertiserRepository extends Repository<Advertiser> {
  constructor(dataSource: DataSource) {
    super(Advertiser, dataSource.createEntityManager());
  }
  async createAndSave(
    createAdvertiserInput: ICreateAdvertiserInput,
    queryRunner?: QueryRunner
  ): Promise<Advertiser> {
    const newAdvertiser = this.create(createAdvertiserInput);

    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newAdvertiser)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Advertiser> {
    const queryResult = await this.createQueryBuilder('findById', queryRunner)
      .where({ id })
      .getOne();

    return queryResult;
  }

  async findByUserId(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<Advertiser> {
    const queryResult = await this.createQueryBuilder(
      'findByUserId',
      queryRunner
    )
      .where({ userId })
      .getOne();

    return queryResult;
  }

  async updateById(
    id: number,
    updateAdvertiserInput: IUpdateAdvertiserInput,
    queryRunner?: QueryRunner
  ): Promise<Advertiser> {
    const queryResult = await this.createQueryBuilder('updateById', queryRunner)
      .update(updateAdvertiserInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
