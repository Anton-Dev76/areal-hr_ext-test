import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get('employee/:employeeId') findByEmployee(@Param('employeeId', ParseUUIDPipe) employeeId: string) { return this.service.findByEmployee(employeeId); }
  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
  @Put(':id') update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}