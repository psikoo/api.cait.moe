import { Module } from '@nestjs/common';
import { ShortUrlService } from './shortUrl.service';
import { ShortUrlController } from './shortUrl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortUrl } from './entities/shortUrl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlShortUrl])],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
