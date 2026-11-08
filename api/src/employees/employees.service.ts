import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  findAll() { return this.repo.find({ where: { deletedAt: IsNull() } }); }

  async findOne(id: string) {
    const employee = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!employee) throw new NotFoundException('Сотрудник не найден');
    return employee;
  }

  create(data: Partial<Employee>) {
    const employee = this.repo.create(data);
    return this.repo.save(employee);
  }

  async update(id: string, data: Partial<Employee>) {
    const employee = await this.findOne(id);
    Object.assign(employee, data);
    return this.repo.save(employee);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    employee.deletedAt = new Date();
    return this.repo.save(employee);
  }
}