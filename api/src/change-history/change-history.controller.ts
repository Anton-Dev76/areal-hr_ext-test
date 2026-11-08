import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ChangeHistoryService } from './change-history.service';

@Controller('change-history')
export class ChangeHistoryController {
  constructor(private readonly service: ChangeHistoryService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get('entity/:entityType/:entityId') findByEntity(@Param('entityType') entityType: string, @Param('entityId', ParseUUIDPipe) entityId: string) { return this.service.findByEntity(entityType, entityId); }
  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
}
