import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Y2kCounter } from './entities/counter.entity';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Y2kCounter])],
  controllers: [CounterController],
  providers: [CounterService]
})
export class CounterModule {}