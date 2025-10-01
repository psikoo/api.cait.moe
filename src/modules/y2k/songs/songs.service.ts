import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto, UpdateSongDto } from './dto';

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private readonly songRepository: Repository<Song>) {}

  async getSongs(): Promise<Song[]> {
    return await this.songRepository.find();
  }
  async getSong(id: number): Promise<Song> {
    const song: Song | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException();
    else return song;
  }
  async createSong(body: CreateSongDto): Promise<Song> {
    const song: Song = await this.songRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      cover: body.cover
    })
    return this.songRepository.save(song);
  }
  async updateSong(id: number, body: UpdateSongDto): Promise<Song> {
    const song: Song | undefined = await this.songRepository.preload({
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
    const song: Song | null = await this.songRepository.findOneBy({id});
    if(!song) throw new NotFoundException("Resource not found");
    else {
      this.songRepository.remove(song);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}