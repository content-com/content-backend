import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  advertiserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stageId: number;
}
