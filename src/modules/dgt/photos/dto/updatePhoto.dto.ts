import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './createPhoto.dto';
import { IsNumber, IsString } from 'class-validator';
import { DgtCamera } from '../../cameras/entities/camera.entity';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @IsString()
  url: string;
  @IsNumber()
  time: string;
  @IsNumber()
  cameraId: DgtCamera;
}