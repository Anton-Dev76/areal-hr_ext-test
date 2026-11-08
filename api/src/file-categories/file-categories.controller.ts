import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { FileCategoriesService } from './file-categories.service';

@Controller('file-categories')
export class FileCategoriesController {
  constructor(private readonly service: FileCategoriesService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
  @Put(':id') update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}
