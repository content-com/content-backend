import { IsNotEmpty, MinLength, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from 'src/common/constants/types/platform';
import { Platforms } from 'src/common/constants/enums';

const platforms = Object.keys(Platforms);

export class CreateIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  authorizationCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(platforms)
  platform: Platform;
}
