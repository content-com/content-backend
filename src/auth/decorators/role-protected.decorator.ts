import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/common/constants/enums';
import { METADATA_REQUEST_ROLES } from '../constants/metadata-request';

export const RoleProtected = (...args: UserRoles[]) => {
  return SetMetadata(METADATA_REQUEST_ROLES, args);
};
