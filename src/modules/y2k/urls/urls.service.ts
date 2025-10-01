import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2kUrl } from './entities/url.entity';
import { CreateUrlDto, UpdateUrlDto } from './dto';

@Injectable()
export class UrlsService {
  constructor(@InjectRepository(Y2kUrl) private readonly urlRepository: Repository<Y2kUrl>) {}

  async getUrls(): Promise<Y2kUrl[]> {
    return await this.urlRepository.find();
  }
  async getUrl(id: number): Promise<Y2kUrl> {
    const url: Y2kUrl | null= await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException();
    else return url;
  }
  async createUrl(body: CreateUrlDto): Promise<Y2kUrl> {
    const url: Y2kUrl = await this.urlRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name
    })
    return this.urlRepository.save(url);
  }
  async updateUrl(id: number, body: UpdateUrlDto): Promise<Y2kUrl> {
    const url: Y2kUrl | undefined = await this.urlRepository.preload({
      id,
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name
    })
    if(!url) throw new NotFoundException("Resource not found");
    else this.urlRepository.save(url);
    return url;
  }
  async deleteUrl(id: number): Promise<JSON> {
    const url: Y2kUrl | null = await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException("Resource not found");
    else {
      this.urlRepository.remove(url);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}