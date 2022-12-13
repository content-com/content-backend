import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectionService } from './connection.service';

@ApiTags('connection')
@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}
  @Get()
  async getConnections() {
    try {
      const connections = await this.connectionService.getConnections();
      return connections;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteConnection(@Param('id', ParseIntPipe) connectionId: number) {
    try {
      const deletedConnection = await this.connectionService.deleteConnection(
        connectionId
      );
      if (!deletedConnection) {
        throw new Error('Problem at deleting');
      }
      return deletedConnection;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
