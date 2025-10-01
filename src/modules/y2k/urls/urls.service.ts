import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { CreateUrlDto, UpdateUrlDto } from './dto';

@Injectable()
export class UrlsService {
  constructor(@InjectRepository(Url) private readonly urlRepository: Repository<Url>) {}

  async getUrls(): Promise<Url[]> {
    return await this.urlRepository.find();
  }
  async getUrl(id: number): Promise<Url> {
    const url: Url | null= await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException();
    else return url;
  }
  async createUrl(body: CreateUrlDto): Promise<Url> {
    const url: Url = await this.urlRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name
    })
    return this.urlRepository.save(url);
  }
  async updateUrl(id: number, body: UpdateUrlDto): Promise<Url> {
    const url: Url | undefined = await this.urlRepository.preload({
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
    const url: Url | null = await this.urlRepository.findOneBy({id});
    if(!url) throw new NotFoundException("Resource not found");
    else {
      this.urlRepository.remove(url);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}