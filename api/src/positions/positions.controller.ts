import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: CreatePositionDto) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdatePositionDto) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}
