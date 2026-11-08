import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrOperationsController } from './hr-operations.controller';
import { HrOperationsService } from './hr-operations.service';
import { HrOperation } from './hr-operations.entity';
import { Employee } from '../employees/employees.entity';
import { Department } from '../departments/departments.entity';
import { Position } from '../positions/positions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrOperation, Employee, Department, Position])],
  controllers: [HrOperationsController],
  providers: [HrOperationsService],
})
export class HrOperationsModule {}
