import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './createSong.dto';
import { IsBoolean, IsString } from "class-validator";

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsString()
  url: string;
  @IsString()
  tag: string;
  @IsBoolean()
  sfw: boolean;
  @IsString()
  name: string;
  @IsString()
  cover: string;
}