import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { METADATA_REQUEST_TYPES } from '../constants/metadata-request';
import { User } from 'src/entities';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validTypeHandler: string = this.reflector.get(
      METADATA_REQUEST_TYPES,
      context.getHandler()
    );

    const validTypeClass: string = this.reflector.get(
      METADATA_REQUEST_TYPES,
      context.getClass()
    );

    const validTypes = [validTypeHandler, validTypeClass];
    if (validTypes.every((type) => !type)) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    const isValidType = validTypes.filter(
      (validType) => validType === user.type
    );

    if (isValidType.length === 1) return true;

    throw new ForbiddenException(
      `User with type ${user.type} cannot acces to a route protected to ${
        validTypes[0] || validTypes[1]
      }S`
    );
  }
}
