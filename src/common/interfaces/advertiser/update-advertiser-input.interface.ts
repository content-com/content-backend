import { ISocialNetworks } from '.';

export interface IUpdateAdvertiserInput {
  userName?: string;
  profileImage?: string;
  description?: string;
  socialNetworks?: ISocialNetworks;
  contentType?: string[];
  validated?: boolean;
  credits?: number;
}
