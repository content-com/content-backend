import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';
import { AdvertiserRepository } from 'src/advertiser/advertiser.repository';
import { CreatorModule } from 'src/creator/creator.module';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Advertiser, Creator } from 'src/entities';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertiser, Creator]),
    UserModule,
    forwardRef(() => AdvertiserModule),
    CreatorModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        };
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    CreatorRepository,
    AdvertiserRepository
  ],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
