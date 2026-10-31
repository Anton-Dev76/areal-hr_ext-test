import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Organization } from './organizations.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly repo: Repository<Organization>,
  ) {}

  findAll() {
    return this.repo.find({ where: { deletedAt: IsNull() } });
  }

  async findOne(id: string) {
    const org = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!org) throw new NotFoundException('Организация не найдена');
    return org;
  }

  create(data: Partial<Organization>) {
    const org = this.repo.create(data);
    return this.repo.save(org);
  }

  async update(id: string, data: Partial<Organization>) {
    const org = await this.findOne(id);
    Object.assign(org, data);
    return this.repo.save(org);
  }

  async remove(id: string) {
    const org = await this.findOne(id);
    org.deletedAt = new Date();
    return this.repo.save(org);
  }
}