import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './positions.entity';

@Controller('positions')
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: Partial<Position>) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Position>) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
