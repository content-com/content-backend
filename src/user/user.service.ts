import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto';
import { CreatorRepository } from 'src/creator/creator.repository';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { IUpdateAdvertiserInput } from 'src/common/interfaces/advertiser';
import { AdvertiserRepository } from 'src/advertiser/advertiser.repository';
import { UserTypes } from 'src/common/constants';
import { CompleteOnboardingDto } from './onboarding/dto';
import { IUpdateCreatorInput } from 'src/common/interfaces/creator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly advertiserRepository: AdvertiserRepository,
    private readonly dataSource: DataSource
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    //here is an example of whay error handle should be in service layer
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async createUser(signUpRequestDto: SignUpRequestDto): Promise<User> {
    const newUser = this.userRepository.create(signUpRequestDto);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateById(id, updateUserDto);
    return updatedUser;
  }

  async completeOnboarding(
    id: number,
    completeOnboardingDto: CompleteOnboardingDto
  ) {
    const user = await this.userRepository.findById(id);
    if (user.onboardingCompleted)
      throw new Error('User has already completed the onboarding');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { description, birthDate, userName, contentType, socialNetworks } =
        completeOnboardingDto;
      const updatedUser = await this.userRepository.updateById(
        id,
        {
          onboardingCompleted: true
        },
        queryRunner
      );

      const isCreator = updatedUser.type === UserTypes.CREATOR;

      let creatorId: number;
      let advertiserId: number;

      if (isCreator) {
        const creator = await this.creatorRepository.findByUserId(
          id,
          queryRunner
        );
        if (!creator)
          throw new Error(`Creator not found with given user id ${id}`);

        if (!creator.youtubeLinked)
          throw new Error(`Creator has not youtube linked`);

        if (!birthDate)
          throw new Error(
            'birthDate is required to complete the onboarding of a creator'
          );
        const updateCreatorInput: IUpdateCreatorInput = {
          description,
          userName,
          contentType,
          birthDate
        };
        const updatedCreator = await this.creatorRepository.updateById(
          creator.id,
          updateCreatorInput,
          queryRunner
        );
        creatorId = updatedCreator.id;
      } else {
        const advertiser = await this.advertiserRepository.findByUserId(
          id,
          queryRunner
        );
        if (!advertiser)
          throw new Error(`Advertiser not found with given user id ${id}`);
        if (!socialNetworks)
          throw new Error(
            'socialNetworks is required to complete the onboarding of an advertiser'
          );

        const updateAdvertiserInput: IUpdateAdvertiserInput = {
          description,
          userName,
          contentType,
          ...socialNetworks
        };
        const advertiserCreated = await this.advertiserRepository.updateById(
          advertiser.id,
          updateAdvertiserInput,
          queryRunner
        );
        advertiserId = advertiserCreated.id;
      }

      await queryRunner.commitTransaction();
      Logger.log(
        `User ${updatedUser?.id} updated onboaring completed succesfully.`
      );
      return {
        ...updatedUser,
        creatorId,
        advertiserId
      };
    } catch (err) {
      Logger.error(`Onboarding completion transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(id: number): Promise<User> {
    const queryResult = await this.userRepository
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
