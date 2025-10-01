import { Body, Controller, Headers, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Url } from './entities/url.entity';
import { UrlsService } from './urls.service';
import { CreateUrlDto, UpdateUrlDto } from './dto';

@Controller('y2k/urls')
export class UrlsController {
  constructor(private readonly urlService: UrlsService) {};

  @Get()
  getUrls(): Promise<Url[]> {
    return this.urlService.getUrls();
  }
  @Get(":id")
  getUrl(@Param("id") id: number): Promise<Url> {
    return this.urlService.getUrl(id);
  }
  @Post()
  createUrl(@Headers('apiKey') apiKey: string, @Body() body: CreateUrlDto): Promise<Url> {
    return this.urlService.createUrl(body);
  }
  @Patch(":id")
  updateUrl(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateUrlDto): Promise<Url> {
    return this.urlService.updateUrl(id, body);
  }
  @Delete(":id")
  deleteUrl(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.urlService.deleteUrl(id);
  }
}