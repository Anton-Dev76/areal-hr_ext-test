import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';
import { Organization } from '../organizations/organizations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Organization])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}