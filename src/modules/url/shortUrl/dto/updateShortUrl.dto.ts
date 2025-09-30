import { PartialType } from '@nestjs/mapped-types';
import { CreateShortUrlDto } from './createShortUrl.dto';
import { IsString } from "class-validator";

export class UpdateShortUrlDto extends PartialType(CreateShortUrlDto) {
  @IsString()
  readonly oldUrl: string;
  @IsString()
  readonly newUrl: string;
}