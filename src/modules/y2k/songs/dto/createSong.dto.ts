import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateSongDto {
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