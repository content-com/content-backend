import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'src/entities';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  controllers: [ConnectionController],
  providers: [ConnectionService]
})
export class ConnectionModule {}
