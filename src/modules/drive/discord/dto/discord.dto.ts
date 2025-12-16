
import { IsString } from "class-validator";

export class Discord {
  @IsString()
  path: string;
  @IsString()
  token: string;
}