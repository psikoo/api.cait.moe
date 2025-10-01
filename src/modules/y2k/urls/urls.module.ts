import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Y2KUrl } from './entities/url.entity';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Y2KUrl])],
  controllers: [UrlsController],
  providers: [UrlsService]
})
export class UrlsModule {}