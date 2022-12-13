import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnalyticsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  analyticsYoutubeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tokenInfoId: number;
}
