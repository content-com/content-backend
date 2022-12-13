import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/common/constants';
import { METADATA_REQUEST_TYPES } from '../constants/metadata-request';

export const TypeProtected = (type: UserType) => {
  return SetMetadata(METADATA_REQUEST_TYPES, type);
};
