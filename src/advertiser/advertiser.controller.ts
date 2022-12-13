import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { AdvertiserService } from './advertiser.service';
import { UpdateAdvertiserDto } from './dto';

@Auth()
@ApiTags('advertiser')
@Controller('advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Get()
  async getAdvertisers() {
    try {
      const advertisers = await this.advertiserService.getAdvertisers();
      return advertisers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getAdvertiser(@Param('id', ParseIntPipe) advertiserId: number) {
    try {
      const advertiser = await this.advertiserService.getAdvertiser(
        advertiserId
      );
      if (!advertiser) {
        throw new Error(`Advertiser with id ${advertiserId} not found`);
      }
      return advertiser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateAdvertiser(@Body() updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
      const updatedAdvertiser = await this.advertiserService.updateAdvertiser(
        updateAdvertiserDto
      );
      if (!updatedAdvertiser) {
        throw new Error('Problem at updating');
      }
      return updatedAdvertiser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteAdvertiser(@Param('id', ParseIntPipe) advertiserId: number) {
    try {
      const deletedAdvertiser = await this.advertiserService.deleteAdvertiser(
        advertiserId
      );
      if (!deletedAdvertiser) {
        throw new Error('Problem at deleting');
      }
      return deletedAdvertiser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
