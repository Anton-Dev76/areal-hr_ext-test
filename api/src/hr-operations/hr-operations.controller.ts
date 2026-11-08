import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { HrOperationsService } from './hr-operations.service';

@Controller('hr-operations')
export class HrOperationsController {
  constructor(private readonly service: HrOperationsService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get('employee/:employeeId') findByEmployee(@Param('employeeId', ParseUUIDPipe) employeeId: string) { return this.service.findByEmployee(employeeId); }
  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
  @Put(':id') update(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}
