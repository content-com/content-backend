import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Creator } from 'src/entities';
import { CreatorController } from './creator.controller';
import { CreatorRepository } from './creator.repository';
import { CreatorService } from './creator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Creator]), forwardRef(() => AuthModule)],
  controllers: [CreatorController],
  providers: [CreatorService, CreatorRepository],
  exports: [CreatorService, CreatorRepository]
})
export class CreatorModule {}
