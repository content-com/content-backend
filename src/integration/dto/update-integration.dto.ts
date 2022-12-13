import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber
} from 'class-validator';

export class UpdateIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  accessToken?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  expireToken?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  refreshToken?: string;
}
