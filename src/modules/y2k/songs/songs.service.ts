import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2KSong } from './entities/song.entity';
import { CreateSongDto, UpdateSongDto } from './dto';

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Y2KSong) private readonly songRepository: Repository<Y2KSong>) {}

  async getSongs(): Promise<Y2KSong[]> {
    return await this.songRepository.find();
  }
  async getSong(id: number): Promise<Y2KSong> {
    const song: Y2KSong | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException();
    else return song;
  }
  async createSong(body: CreateSongDto): Promise<Y2KSong> {
    const song: Y2KSong = await this.songRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      cover: body.cover
    })
    return this.songRepository.save(song);
  }
  async updateSong(id: number, body: UpdateSongDto): Promise<Y2KSong> {
    const song: Y2KSong | undefined = await this.songRepository.preload({
      id,
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      cover: body.cover
    })
    if(!song) throw new NotFoundException("Resource not found");
    else this.songRepository.save(song);
    return song;
  }
  async deleteSong(id: number): Promise<JSON> {
    const song: Y2KSong | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException("Resource not found");
    else {
      this.songRepository.remove(song);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}