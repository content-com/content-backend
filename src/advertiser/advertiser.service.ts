import { Injectable } from '@nestjs/common';
import { Advertiser } from 'src/entities';
import { AdvertiserRepository } from './advertiser.repository';
import { UpdateAdvertiserDto } from './dto';
@Injectable()
export class AdvertiserService {
  constructor(private readonly advertiserRepository: AdvertiserRepository) {}
  async getAdvertisers(): Promise<Advertiser[]> {
    const advertisers = await this.advertiserRepository.find();
    return advertisers;
  }

  async getAdvertiser(id: number): Promise<Advertiser> {
    const advertiser = await this.advertiserRepository.findById(id);
    return advertiser;
  }

  async updateAdvertiser(
    updateAdvertiserDto: UpdateAdvertiserDto
  ): Promise<Advertiser> {
    const queryResult = await this.advertiserRepository
      .createQueryBuilder()
      .update(updateAdvertiserDto)
      .where({
        id: updateAdvertiserDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteAdvertiser(id: number): Promise<Advertiser> {
    const queryResult = await this.advertiserRepository
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
