import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CreateCameraDto, UpdateCameraDto } from './dto';

@Controller('dgt/cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  create(@Body() createCameraDto: CreateCameraDto) {
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  findAll() {
    return this.camerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camerasService.findOne(+id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.camerasService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return this.camerasService.update(+id, updateCameraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camerasService.remove(+id);
  }
}