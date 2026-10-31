import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: Partial<Department>) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Department>) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}