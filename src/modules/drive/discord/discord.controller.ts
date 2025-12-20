import { Controller, Get, Body, Query, Post, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
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
  @Get("/cdn")
  getCnd(@Query() query: any): Promise<JSON> {
    return this.discordService.getCdn(query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postUrl(@Query() query: Discord, @UploadedFile() file: any): Promise<JSON> {
    return this.discordService.postUrl(query, file);
  }

  @Delete()
  @UseInterceptors(FileInterceptor('file'))
  deleteUrl(@Query() query: Discord): Promise<JSON> {
    return this.discordService.deleteUrl(query);
  }
}