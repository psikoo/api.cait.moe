import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2kCounter } from './entities/counter.entity';

@Injectable()
export class CounterService {
  constructor(@InjectRepository(Y2kCounter) private readonly counterRepository: Repository<Y2kCounter>) {}

  async getCounter(): Promise<Y2kCounter> {
    const previousCounter: Y2kCounter | null = await this.counterRepository.findOneBy({id:0});
    const newCount = previousCounter!.counter+1;
    const counter: Y2kCounter | undefined = await this.counterRepository.preload({
      id: 0,
      counter: newCount,
    });
    this.counterRepository.save(counter!);
    return counter!;
  }

  async deleteCounter(): Promise<JSON> {
    const counter: Y2kCounter | undefined = await this.counterRepository.preload({
      id: 0,
      counter: 0,
    });    
    this.counterRepository.save(counter!);
    return JSON.parse(`{"Counter": "0"}`);
  }
}