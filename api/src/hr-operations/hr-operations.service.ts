import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { HrOperation } from './hr-operations.entity';
import { Employee } from '../employees/employees.entity';
import { Department } from '../departments/departments.entity';
import { Position } from '../positions/positions.entity';

const ALLOWED_TYPES = ['hire', 'fire', 'change'];

@Injectable()
export class HrOperationsService {
  constructor(
    @InjectRepository(HrOperation)
    private readonly repo: Repository<HrOperation>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Position)
    private readonly positionRepo: Repository<Position>,
  ) {}

  findAll() { return this.repo.find(); }

  findByEmployee(employeeId: string) {
    return this.repo.find({ where: { employeeId } });
  }

  async findOne(id: string) {
    const op = await this.repo.findOne({ where: { id } });
    if (!op) throw new NotFoundException('Операция не найдена');
    return op;
  }

  async create(data: Partial<HrOperation>) {
    const employee = await this.employeeRepo.findOne({ where: { id: data.employeeId, deletedAt: IsNull() } });
    if (!employee) throw new NotFoundException('Сотрудник не найден');

    const department = await this.departmentRepo.findOne({ where: { id: data.departmentId, deletedAt: IsNull() } });
    if (!department) throw new NotFoundException('Отдел не найден');

    const position = await this.positionRepo.findOne({ where: { id: data.positionId, deletedAt: IsNull() } });
    if (!position) throw new NotFoundException('Должность не найдена');

    if (!data.type || !ALLOWED_TYPES.includes(data.type)) {
      throw new BadRequestException('Тип операции должен быть hire, fire или change');
    }

    const op = this.repo.create(data);
    return this.repo.save(op);
  }

  async update(id: string, data: Partial<HrOperation>) {
    const op = await this.findOne(id);
    Object.assign(op, data);
    return this.repo.save(op);
  }

  async remove(id: string) {
    const op = await this.findOne(id);
    return this.repo.remove(op);
  }
}