import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto, UpdatePhotoDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DgtPhoto } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { DgtCamera } from '../cameras/entities/camera.entity';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(DgtPhoto) private readonly photoRepository: Repository<DgtPhoto>) {}

  async create(body: CreatePhotoDto) {
    const photo: DgtPhoto = await this.photoRepository.create({
      url: body.url,
      time: body.time,
      cameraId: body.cameraId,
    })
    return this.photoRepository.save(photo);
  }

  async findAll() {
    return await this.photoRepository.find({order: {id: {direction: "DESC"}}, relations: ["cameraId"]});
  }

  async find100ByCameraId(id: number) {
    return await this.photoRepository.find({where: {cameraId: {id: id}}, order: {id: {direction: "DESC"}}, take:100, relations: ["cameraId"]});
  }

  async findOne(id: number) {
    const photo: DgtPhoto | null = await this.photoRepository.findOne({where: {id: id}, relations: ["cameraId"]});
    if(!photo) throw new NotFoundException();
    else return photo;
  }

  async update(id: number, body: UpdatePhotoDto) {
    const photo: DgtPhoto | undefined = await this.photoRepository.preload({
      id,
      url: body.url,
      time: body.time,
      cameraId: body.cameraId,
    })
    if(!photo) throw new NotFoundException("Resource not found");
    else this.photoRepository.save(photo);
    return photo;
  }

  async remove(id: number) {
    const photo: DgtPhoto | null = await this.photoRepository.findOneBy({id});
    if(!photo) throw new NotFoundException("Resource not found");
    else {
      this.photoRepository.remove(photo);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}