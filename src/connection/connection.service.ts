import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>
  ) {}
  async getConnections(): Promise<Connection[]> {
    const connections = await this.connectionRepository.find();
    return connections;
  }

  async deleteConnection(id: number): Promise<Connection> {
    const queryResult = await this.connectionRepository
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
