import { Controller, Get } from '@nestjs/common';

import { ApisService } from './apis.service';

@Controller('www/apis')
export class ApisController {
    constructor(private readonly ApisService: ApisService) {};

    @Get("weather")
    getWeather(): Promise<JSON> {
        return this.ApisService.getWeather();
    }
    @Get("lastfm")
    getLastFM(): Promise<JSON> {
        return this.ApisService.getLastFM();
    }
    @Get("discord")
    getDiscord(): Promise<JSON> {
        return this.ApisService.getDiscord();
    }
}