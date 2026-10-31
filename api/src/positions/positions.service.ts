import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Position } from './positions.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly repo: Repository<Position>,
  ) {}

  findAll() {
    return this.repo.find({ where: { deletedAt: IsNull() } });
  }

  async findOne(id: string) {
    const pos = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!pos) throw new NotFoundException('Должность не найдена');
    return pos;
  }

  create(data: Partial<Position>) {
    const pos = this.repo.create(data);
    return this.repo.save(pos);
  }

  async update(id: string, data: Partial<Position>) {
    const pos = await this.findOne(id);
    Object.assign(pos, data);
    return this.repo.save(pos);
  }

  async remove(id: string) {
    const pos = await this.findOne(id);
    pos.deletedAt = new Date();
    return this.repo.save(pos);
  }
}