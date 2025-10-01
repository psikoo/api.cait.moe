import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './createUrl.dto';
import { IsBoolean, IsString } from "class-validator";

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @IsString()
  url: string;
  @IsString()
  tag: string;
  @IsBoolean()
  sfw: boolean;
  @IsString()
  name: string;
}