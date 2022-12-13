import { Injectable } from '@nestjs/common';
import { Creator } from 'src/entities';
import { CreatorRepository } from './creator.repository';
import { UpdateCreatorDto } from './dto';

@Injectable()
export class CreatorService {
  constructor(private readonly creatorRepository: CreatorRepository) {}
  async getCreators(): Promise<Creator[]> {
    const creators = await this.creatorRepository.find();
    return creators;
  }

  async getCreator(id: number): Promise<Creator> {
    const creator = await this.creatorRepository.findById(id);
    return creator;
  }

  async updateCreator(updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const queryResult = await this.creatorRepository
      .createQueryBuilder()
      .update(updateCreatorDto)
      .where({
        id: updateCreatorDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteCreator(id: number): Promise<Creator> {
    const queryResult = await this.creatorRepository
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
