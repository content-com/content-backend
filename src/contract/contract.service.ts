import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateContractDto, UpdateContractDto } from './dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepositoriy: Repository<Contract>
  ) {}
  async getContracts(): Promise<Contract[]> {
    const contracts = await this.contractRepositoriy.find();
    return contracts;
  }

  async createContract(
    createContractDto: CreateContractDto
  ): Promise<Contract> {
    const newContract = this.contractRepositoriy.create(createContractDto);
    await this.contractRepositoriy.save(newContract);
    return newContract;
  }

  async updateContract(
    updateContractDto: UpdateContractDto
  ): Promise<Contract> {
    const queryResult = await this.contractRepositoriy
      .createQueryBuilder()
      .update(updateContractDto)
      .where({
        id: updateContractDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
