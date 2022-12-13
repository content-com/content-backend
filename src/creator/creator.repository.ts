import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Creator } from 'src/entities';
import {
  ICreateCreatorInput,
  IUpdateCreatorInput
} from '../common/interfaces/creator';

@Injectable()
export class CreatorRepository extends Repository<Creator> {
  constructor(dataSource: DataSource) {
    super(Creator, dataSource.createEntityManager());
  }
  async createAndSave(
    createCreatorInput: ICreateCreatorInput,
    queryRunner?: QueryRunner
  ): Promise<Creator> {
    const newCreator = this.create(createCreatorInput);
    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newCreator)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Creator> {
    const queryResult = await this.createQueryBuilder('findById', queryRunner)
      .where({ id })
      .getOne();

    return queryResult;
  }

  async findByUserId(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<Creator> {
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
    updateCreatorInput: IUpdateCreatorInput,
    queryRunner?: QueryRunner
  ): Promise<Creator> {
    const queryResult = await this.createQueryBuilder('updateById', queryRunner)
      .update(updateCreatorInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async updateByUserId(
    userId: number,
    updateCreatorInput: IUpdateCreatorInput,
    queryRunner?: QueryRunner
  ): Promise<Creator> {
    const queryResult = await this.createQueryBuilder(
      'updateByUserId',
      queryRunner
    )
      .update(updateCreatorInput)
      .where({
        userId
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
