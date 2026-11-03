import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: CreateDepartmentDto) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateDepartmentDto) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}