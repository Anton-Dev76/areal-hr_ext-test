import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from './departments.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly repo: Repository<Department>,
  ) {}

  findAll() {
    return this.repo.find({ where: { deletedAt: IsNull() } });
  }

  async findOne(id: string) {
    const dep = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!dep) throw new NotFoundException('Отдел не найден');
    return dep;
  }

  create(data: Partial<Department>) {
    const dep = this.repo.create(data);
    return this.repo.save(dep);
  }

  async update(id: string, data: Partial<Department>) {
    const dep = await this.findOne(id);
    Object.assign(dep, data);
    return this.repo.save(dep);
  }

  async remove(id: string) {
    const dep = await this.findOne(id);
    dep.deletedAt = new Date();
    return this.repo.save(dep);
  }
}
