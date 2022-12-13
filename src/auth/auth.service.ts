import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/user/user.repository';
import { SignInRequestDto, SignUpRequestDto } from '../common/dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserTypes } from 'src/common/constants';
import { CreatorRepository } from 'src/creator/creator.repository';
import { AdvertiserRepository } from 'src/advertiser/advertiser.repository';
import { ICreateCreatorInput } from 'src/common/interfaces/creator';
import { ICreateAdvertiserInput } from 'src/common/interfaces/advertiser';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly advertiserRepository: AdvertiserRepository,
    private readonly jwService: JwtService,
    private readonly dataSource: DataSource
  ) {}
  async signUp(signUpRequestDto: SignUpRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { type, password } = signUpRequestDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      //TODO: DO NOT MUTATE INPUT VARIABLE. FUNCTIONAL PROGRAMMING
      signUpRequestDto = { ...signUpRequestDto, password: hashedPassword };

      const newUser = await this.userRepository.createAndSave(
        signUpRequestDto,
        queryRunner
      );
      const { id: newUserId } = newUser;

      const isCreator = type === UserTypes.CREATOR;

      let newCreatorId: number;
      let newAdvertiserId: number;

      if (isCreator) {
        const createCreatorInput: ICreateCreatorInput = {
          userId: newUserId
        };
        const creatorCreated = await this.creatorRepository.createAndSave(
          createCreatorInput,
          queryRunner
        );
        newCreatorId = creatorCreated.id;
      } else {
        const createAdvertiserInput: ICreateAdvertiserInput = {
          userId: newUserId
        };

        const advertiserCreated = await this.advertiserRepository.createAndSave(
          createAdvertiserInput,
          queryRunner
        );
        newAdvertiserId = advertiserCreated.id;
      }

      const token = this.getJwtToken({ id: newUserId, userType: type });

      await queryRunner.commitTransaction();
      return {
        ...newUser,
        creatorId: newCreatorId,
        advertiserId: newAdvertiserId,
        token
      };
    } catch (error) {
      Logger.error(`User signup transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    try {
      const { email, password } = signInRequestDto;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error('Credentials are not valid (email)');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Credentials are not valid (password)');
      }

      const { type, id } = user;
      const token = this.getJwtToken({ id, userType: type });

      delete user.password;
      return {
        ...user,
        token
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private getJwtToken(payload: IJwtPayload): string {
    return this.jwService.sign(payload);
  }
}
