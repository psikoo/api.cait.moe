import { Controller, Get, Body } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Discord } from './dto';

@Controller('drive/discord')
export class DiscordController {
  constructor(private readonly userService: DiscordService) {};

  @Get()
  getUrl(@Body() body: Discord): Promise<JSON> {
    return this.userService.getUrl(body);
  }
}