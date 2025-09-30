import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDto } from './createCamera.dto';
import { IsString, IsBoolean } from 'class-validator';

export class UpdateCameraDto extends PartialType(CreateCameraDto) {
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
