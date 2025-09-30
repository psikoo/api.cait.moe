import { IsBoolean, IsString } from "class-validator";

export class CreateCameraDto {
  @IsString()
  url: string;
  @IsString()
  name: string;
  @IsString()
  road: string;
  @IsString()
  location: string;
  @IsBoolean()
  watch: boolean;
}