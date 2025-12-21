
import { IsOptional, IsString } from "class-validator";

export class Discord {
  @IsString()
  path: string;
  @IsString()
  token: string;
  @IsString()
  @IsOptional()
  limit: string;
  @IsString()
  @IsOptional()
  before: string;
}