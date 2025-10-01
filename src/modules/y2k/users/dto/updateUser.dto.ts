import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { IsNumber, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString()
  readonly birthday: string;
  @IsString()
  readonly gender: string;
  @IsString()
  readonly pronouns: string;
  @IsString()
  readonly orientation: string;
  @IsString()
  readonly quote: string;
  @IsString()
  readonly intro: string;
  @IsString()
  readonly mood: string;
  @IsString()
  readonly linkName: string;
  @IsString()
  readonly urlString: string;
}