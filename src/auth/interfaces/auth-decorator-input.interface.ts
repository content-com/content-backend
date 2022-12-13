import { UserRoles, UserType } from 'src/common/constants';

export interface AuthDecoratorInput {
  roles?: UserRoles[];
  type?: UserType;
}
