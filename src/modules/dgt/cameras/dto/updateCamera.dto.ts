import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDto } from './createCamera.dto';
import { IsBoolean, IsString } from 'class-validator/types/decorator/decorators';

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
