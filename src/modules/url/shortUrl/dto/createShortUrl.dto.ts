import { IsString } from "class-validator";

export class CreateShortUrlDto {
  @IsString()
  readonly oldUrl: string;
  @IsString()
  readonly newUrl: string;
}