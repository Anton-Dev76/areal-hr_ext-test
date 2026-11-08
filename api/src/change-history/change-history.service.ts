import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeHistory } from './change-history.entity';

@Injectable()
export class ChangeHistoryService {
  constructor(
    @InjectRepository(ChangeHistory)
    private readonly repo: Repository<ChangeHistory>,
  ) {}

  findAll() { return this.repo.find(); }

  findByEntity(entityType: string, entityId: string) {
    return this.repo.find({ where: { entityType, entityId } });
  }

  async findOne(id: string) {
    const record = await this.repo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Запись не найдена');
    return record;
  }

  create(data: Partial<ChangeHistory>) {
    const record = this.repo.create(data);
    return this.repo.save(record);
  }
}