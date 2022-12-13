import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { Platforms } from 'src/common/constants/enums';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { IUpdateCreatorInput } from 'src/common/interfaces/creator';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly googleOAuth2Service: GoogleService,
    private readonly creatorRepository: CreatorRepository,
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly dataSource: DataSource
  ) {}

  async getIntegration(id: number): Promise<Integration> {
    const integration = await this.integrationRepository.findOne({
      where: { id }
    });
    return integration;
  }

  async createIntegration(
    userId: number,
    createIntegrationDto: CreateIntegrationDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const updatedCreator = await this.creatorRepository.updateByUserId(
        userId,
        { youtubeLinked: true } as IUpdateCreatorInput,
        queryRunner
      );

      const {
        access_token: accessToken,
        expiry_date: expiryDate,
        id_token: idToken,
        refresh_token: refreshToken
        // scope,
        // token_type: tokenType
      } = await this.googleOAuth2Service.getToken(
        createIntegrationDto.authorizationCode
      );

      const platform =
        Platforms[createIntegrationDto.platform as keyof typeof Platforms];

      const newIntegration = await this.integrationRepository.createAndSave(
        {
          accessToken,
          expiryDate,
          idToken,
          refreshToken
        },
        queryRunner
      );

      const newAnalytics = await this.analyticsRepository.createAndSave(
        {
          creatorId: updatedCreator.id,
          integrationId: newIntegration.id,
          platform
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return {
        userId,
        creatorId: updatedCreator.id,
        integrationId: newIntegration.id,
        analyticsId: newAnalytics.id
      };
    } catch (err) {
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
