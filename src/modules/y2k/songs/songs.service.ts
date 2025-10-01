import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2kSong } from './entities/song.entity';
import { CreateSongDto, UpdateSongDto } from './dto';

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Y2kSong) private readonly songRepository: Repository<Y2kSong>) {}

  async getSongs(): Promise<Y2kSong[]> {
    return await this.songRepository.find();
  }
  async getSong(id: number): Promise<Y2kSong> {
    const song: Y2kSong | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException();
    else return song;
  }
  async createSong(body: CreateSongDto): Promise<Y2kSong> {
    const song: Y2kSong = await this.songRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      cover: body.cover
    })
    return this.songRepository.save(song);
  }
  async updateSong(id: number, body: UpdateSongDto): Promise<Y2kSong> {
    const song: Y2kSong | undefined = await this.songRepository.preload({
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
    const song: Y2kSong | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException("Resource not found");
    else {
      this.songRepository.remove(song);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}