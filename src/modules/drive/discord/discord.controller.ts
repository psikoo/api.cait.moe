import { Controller, Get, Body, Query } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Discord } from './dto';

@Controller('drive/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {};

  @Get()
  getUrl(@Query() query: Discord): Promise<JSON> {
    return this.discordService.getUrl(query);
  }
}