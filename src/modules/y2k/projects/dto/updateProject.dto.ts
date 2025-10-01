import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './createProject.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
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