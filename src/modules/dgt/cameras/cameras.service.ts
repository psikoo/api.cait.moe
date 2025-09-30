import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCameraDto, UpdateCameraDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DgtCamera } from './entities/camera.entity';

@Injectable()
export class CamerasService {
  constructor(@InjectRepository(DgtCamera) private readonly cameraRepository: Repository<DgtCamera>) {}

  async create(body: CreateCameraDto) {
    const camera: DgtCamera = await this.cameraRepository.create({
      url: body.url,
      name: body.name,
      road: body.road,
      location: body.location,
      watch: body.watch
    })
    return this.cameraRepository.save(camera);
  }

  async findAll() {
    return await this.cameraRepository.find({order: {id: {direction: "ASC"}}});
  }

  async findOne(id: number) {
    const camera: DgtCamera | null = await this.cameraRepository.findOneBy({id});
    if(!camera) throw new NotFoundException();
    else return camera;
  }

  async findOneByName(name: string) {
    const camera: DgtCamera | null = await this.cameraRepository.findOne({where: {name: name}});
    if(!camera) throw new NotFoundException();
    else return camera;
  }

  async update(id: number, body: UpdateCameraDto) {
    const camera: DgtCamera | undefined = await this.cameraRepository.preload({
      id,
      url: body.url,
      name: body.name,
      road: body.road,
      location: body.location,
      watch: body.watch
    })
    if(!camera) throw new NotFoundException("Resource not found");
    else this.cameraRepository.save(camera);
    return camera;
  }

  async remove(id: number) {
    const camera: DgtCamera | null = await this.cameraRepository.findOneBy({id});
    if(!camera) throw new NotFoundException("Resource not found");
    else {
      this.cameraRepository.remove(camera);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}