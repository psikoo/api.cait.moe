import { Controller, Delete, Get } from '@nestjs/common';

import { CounterService } from './counter.service';
import { Counter } from './entities/counter.entity';

@Controller('y2k/counter')
export class CounterController {
    constructor(private readonly counterService: CounterService) {};

    @Get()
    getCounter(): Promise<Counter> {
        return this.counterService.getCounter();
    }
    @Delete()
    deleteCounter(): Promise<JSON> {
        return this.counterService.deleteCounter();
    }
}