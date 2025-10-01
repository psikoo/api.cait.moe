import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Y2kUrl } from './entities/url.entity';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Y2kUrl])],
  controllers: [UrlsController],
  providers: [UrlsService]
})
export class UrlsModule {}