import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto';
import { User } from 'src/entities';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { IUpdateUserInput } from './interfaces';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createAndSave(
    createUserInput: SignUpRequestDto,
    queryRunner?: QueryRunner
  ): Promise<User> {
    const newUser = this.create(createUserInput);
    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newUser)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<User> {
    const queryResult = await this.createQueryBuilder('findById', queryRunner)
      .where({ id })
      .getOne();

    return queryResult;
  }

  async findByEmail(email: string, queryRunner?: QueryRunner): Promise<User> {
    const queryResult = await this.createQueryBuilder(
      'findByEmail',
      queryRunner
    )
      .where({ email })
      .getOne();

    return queryResult;
  }

  async updateById(
    id: number,
    updateUserInput: IUpdateUserInput,
    queryRunner?: QueryRunner
  ): Promise<User> {
    const queryResult = await this.createQueryBuilder('updateById', queryRunner)
      .update(updateUserInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
