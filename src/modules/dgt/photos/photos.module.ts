import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { DgtPhoto } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DgtPhoto])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}