import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { METADATA_REQUEST_ROLES } from '../constants/metadata-request';
import { User } from 'src/entities';
import { UserRoles } from 'src/common/constants';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const handlerValidRoles: UserRoles[] = this.reflector.get(
      METADATA_REQUEST_ROLES,
      context.getHandler()
    );

    const classValidRoles: UserRoles[] = this.reflector.get(
      METADATA_REQUEST_ROLES,
      context.getClass()
    );

    const validRoles = this.getValidRoles(handlerValidRoles, classValidRoles);

    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User with email ${user.email} need a valid role: [${validRoles}]`
    );
  }

  getValidRoles = (handlerRoles: UserRoles[], classRoles: UserRoles[]) =>
    [].concat(handlerRoles || []).concat(classRoles || []);
}
