import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { UserTypeGuard } from '../guards/user-type.guard';
import { AuthDecoratorInput } from '../interfaces/auth-decorator-input.interface';
import { RoleProtected } from './role-protected.decorator';
import { TypeProtected } from './type-protected.decorator';

export function Auth(input?: AuthDecoratorInput) {
  return applyDecorators(
    RoleProtected(...(input?.roles || [])),
    TypeProtected(input?.type),
    UseGuards(AuthGuard(), UserRoleGuard, UserTypeGuard)
  );
}
