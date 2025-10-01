import { Body, Controller, Headers, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Y2kSong } from './entities/song.entity';
import { CreateSongDto, UpdateSongDto } from './dto';
import { SongsService } from './songs.service';

@Controller('y2k/songs')
export class SongsController {
  constructor(private readonly configService: ConfigService, private readonly songService: SongsService) {};

  @Get()
  getSongs(): Promise<Y2kSong[]> {
  return this.songService.getSongs();
  }
  @Get(":id")
  getSong(@Param("id") id: number): Promise<Y2kSong> {
  return this.songService.getSong(id);
  }
  @Post()
  createSong(@Headers('apiKey') apiKey: string, @Body() body: CreateSongDto): Promise<Y2kSong> {
    return this.songService.createSong(body);
  }
  @Patch(":id")
  updateSong(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateSongDto): Promise<Y2kSong> {
    return this.songService.updateSong(id, body);
  }
  @Delete(":id")
  deleteSong(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.songService.deleteSong(id);
  }
}