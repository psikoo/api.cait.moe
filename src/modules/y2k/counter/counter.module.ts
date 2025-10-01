import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  controllers: [CounterController],
  providers: [CounterService]
})
export class CounterModule {}