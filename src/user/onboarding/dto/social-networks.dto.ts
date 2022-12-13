import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ISocialNetworks } from 'src/common/interfaces/advertiser';

export class SocialNetworksDto implements ISocialNetworks {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  webPageUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  instagramUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  twitterUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  tiktokUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  facebookUrl: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  youtubeUrl: string;
}
