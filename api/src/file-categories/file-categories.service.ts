import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { FileCategory } from './file-categories.entity';

@Injectable()
export class FileCategoriesService {
  constructor(
    @InjectRepository(FileCategory)
    private readonly repo: Repository<FileCategory>,
  ) {}

  findAll() { return this.repo.find({ where: { deletedAt: IsNull() } }); }

  async findOne(id: string) {
    const category = await this.repo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!category) throw new NotFoundException('Категория не найдена');
    return category;
  }

  create(data: Partial<FileCategory>) {
    const category = this.repo.create(data);
    return this.repo.save(category);
  }

  async update(id: string, data: Partial<FileCategory>) {
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.repo.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    category.deletedAt = new Date();
    return this.repo.save(category);
  }
}