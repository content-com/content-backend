import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto, UpdateContractDto } from './dto';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}
  @Get()
  async getContracts() {
    try {
      const contracts = await this.contractService.getContracts();
      return contracts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createContract(@Body() createContractDto: CreateContractDto) {
    try {
      const contract = await this.contractService.createContract(
        createContractDto
      );
      return contract;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateContract(@Body() updateContractDto: UpdateContractDto) {
    try {
      const updatedContract = await this.contractService.updateContract(
        updateContractDto
      );
      if (!updatedContract) {
        throw new Error('Problem at updating');
      }
      return updatedContract;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
