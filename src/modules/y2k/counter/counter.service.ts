import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CounterService {
  constructor(@InjectRepository(Counter) private readonly counterRepository: Repository<Counter>) {}

  async getCounter(): Promise<Counter> {
    const previousCounter: Counter | null = await this.counterRepository.findOneBy({id:0});
    const newCount = previousCounter!.counter+1;
    const counter: Counter | undefined = await this.counterRepository.preload({
      id: 0,
      counter: newCount,
    });
    this.counterRepository.save(counter!);
    return counter!;
  }

  async deleteCounter(): Promise<JSON> {
    const counter: Counter | undefined = await this.counterRepository.preload({
      id: 0,
      counter: 0,
    });    
    this.counterRepository.save(counter!);
    return JSON.parse(`{"Counter": "0"}`);
  }
}