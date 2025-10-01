import { IsBoolean, IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  url: string;
  @IsString()
  tag: string;
  @IsBoolean()
  sfw: boolean;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  date:string;
}