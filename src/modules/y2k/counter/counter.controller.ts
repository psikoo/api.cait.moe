import { Controller, Delete, Get } from '@nestjs/common';

import { CounterService } from './counter.service';
import { Y2kCounter } from './entities/counter.entity';

@Controller('y2k/counter')
export class CounterController {
    constructor(private readonly counterService: CounterService) {};

    @Get()
    getCounter(): Promise<Y2kCounter> {
        return this.counterService.getCounter();
    }
    @Delete()
    deleteCounter(): Promise<JSON> {
        return this.counterService.deleteCounter();
    }
}