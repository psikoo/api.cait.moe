import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DgtCamera } from './entities/camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DgtCamera])],
  controllers: [CamerasController],
  providers: [CamerasService],
})
export class CamerasModule {}