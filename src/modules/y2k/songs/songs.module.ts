import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Y2kSong } from './entities/song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Y2kSong])],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}