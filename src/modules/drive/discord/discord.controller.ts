import { Controller, Get, Body, Query, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Discord } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('drive/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {};

  @Get()
  getUrl(@Query() query: Discord): Promise<JSON> {
    return this.discordService.getUrl(query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postUrl(@Query() query: Discord, @Body() body: any, @UploadedFile() file: any): Promise<JSON> {
    console.log(body)
    console.log(file)
    return this.discordService.postUrl(query, file);
  }
}