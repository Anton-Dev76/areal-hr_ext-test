import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() body: CreateOrganizationDto) { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateOrganizationDto) { return this.service.update(id, body); }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.service.remove(id); }
}