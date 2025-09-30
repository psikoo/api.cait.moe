import { Controller, Get, Post, Body, Patch, Param, Headers, Delete } from '@nestjs/common';
import { ShortUrlService } from './shortUrl.service';
import { CreateShortUrlDto } from './dto/createShortUrl.dto';
import { UpdateShortUrlDto } from './dto/updateShortUrl.dto';
import { ConfigService } from '@nestjs/config';
import { UrlShortUrl } from './entities/shortUrl.entity';

@Controller('url/shorturl')
export class ShortUrlController {
  constructor(private readonly configService: ConfigService, private readonly userService: ShortUrlService) {};

  @Get()
  getUrls(): Promise<UrlShortUrl[]> {
    return this.userService.getUrls();
  }
  @Get(":id")
  getUrl(@Param("id") id: number): Promise<UrlShortUrl> {
    return this.userService.getUrl(id);
  }
  @Post()
  createUrl(@Headers('apiKey') apiKey: string, @Body() body: CreateShortUrlDto): Promise<UrlShortUrl> {
    return this.userService.createUrl(body);
  }
  @Patch(":id")
  updateUrl(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateShortUrlDto): Promise<UrlShortUrl> {
    return this.userService.updateUrl(id, body);
  }
  @Delete(":id")
  deleteUrl(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.userService.deleteUrl(id);
  }
}