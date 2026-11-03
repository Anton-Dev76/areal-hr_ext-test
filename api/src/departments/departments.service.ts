import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Department } from './departments.entity';
import { Organization } from '../organizations/organizations.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly repo: Repository<Department>,
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  findAll() { return this.repo.find({ where: { deletedAt: IsNull() } }); }

  async findOne(id: string) {
    const dept = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!dept) throw new NotFoundException('Отдел не найден');
    return dept;
  }

  async create(data: CreateDepartmentDto) {
    const org = await this.orgRepo.findOne({ where: { id: data.organizationId, deletedAt: IsNull() } });
    if (!org) throw new NotFoundException('Организация не найдена');

    if (data.parentId) {
      const parent = await this.repo.findOne({ where: { id: data.parentId, deletedAt: IsNull() } });
      if (!parent) throw new NotFoundException('Родительский отдел не найден');
    }

    const dept = this.repo.create(data);
    return this.repo.save(dept);
  }

  async update(id: string, data: UpdateDepartmentDto) {
    const dept = await this.findOne(id);

    if (data.organizationId) {
      const org = await this.orgRepo.findOne({ where: { id: data.organizationId, deletedAt: IsNull() } });
      if (!org) throw new NotFoundException('Организация не найдена');
    }

    if (data.parentId) {
      if (data.parentId === id) throw new BadRequestException('Отдел не может быть родителем самого себя');
      const parent = await this.repo.findOne({ where: { id: data.parentId, deletedAt: IsNull() } });
      if (!parent) throw new NotFoundException('Родительский отдел не найден');
      await this.checkCycle(id, data.parentId);
    }

    Object.assign(dept, data);
    return this.repo.save(dept);
  }

  async remove(id: string) {
    const dept = await this.findOne(id);
    dept.deletedAt = new Date();
    return this.repo.save(dept);
  }

  private async checkCycle(deptId: string, newParentId: string) {
    let currentId = newParentId;
    while (currentId) {
      if (currentId === deptId) throw new BadRequestException('Обнаружен циклический родитель');
      const current = await this.repo.findOne({ where: { id: currentId, deletedAt: IsNull() } });
      if (!current) break;
      currentId = current.parentId;
    }
  }
}
