import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShortUrlDto, UpdateShortUrlDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlShortUrl } from './entities/shortUrl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortUrlService {
  constructor(@InjectRepository(UrlShortUrl) private readonly urlRepository: Repository<UrlShortUrl>) {}

  async getUrls(): Promise<UrlShortUrl[]> {
    return await this.urlRepository.find();
  }
  async getUrl(id: number): Promise<UrlShortUrl> {
    const url: UrlShortUrl | null = await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException();
    else return url;
  }
  async createUrl(body: CreateShortUrlDto): Promise<UrlShortUrl> {
    const url: UrlShortUrl = await this.urlRepository.create({
      oldUrl: body.oldUrl,
      newUrl: body.newUrl
    })
    return this.urlRepository.save(url);
  }
  async updateUrl(id: number, body: UpdateShortUrlDto): Promise<UrlShortUrl> {
    const url: UrlShortUrl | undefined = await this.urlRepository.preload({
      id,
      oldUrl: body.oldUrl,
      newUrl: body.newUrl
    })
    if(!url) throw new NotFoundException("Resource not found");
    else this.urlRepository.save(url);
    return url;
  }
  async deleteUrl(id: number): Promise<JSON> {
    const url: UrlShortUrl | null = await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException("Resource not found");
    else {
      this.urlRepository.remove(url);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}