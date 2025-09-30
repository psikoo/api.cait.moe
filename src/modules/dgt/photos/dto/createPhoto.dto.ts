import { IsNumber, IsString } from "class-validator";
import { DgtCamera } from "../../cameras/entities/camera.entity";

export class CreatePhotoDto {
  @IsString()
  url: string;
  @IsNumber()
  time: string;
  @IsNumber()
  cameraId: DgtCamera;
}