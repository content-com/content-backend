import { Platform } from 'src/common/constants/types/platform';

export interface ICreateAnalyticsInput {
  creatorId: number;
  integrationId: number;
  platform: Platform;
  analyticsYoutubeId?: number;
}
