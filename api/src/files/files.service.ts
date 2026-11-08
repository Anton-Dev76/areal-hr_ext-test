import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly repo: Repository<File>,
  ) {}

  findAll() { return this.repo.find(); }

  findByEmployee(employeeId: string) {
    return this.repo.find({ where: { employeeId } });
  }

  async findOne(id: string) {
    const file = await this.repo.findOne({ where: { id } });
    if (!file) throw new NotFoundException('Файл не найден');
    return file;
  }

  create(data: Partial<File>) {
    const file = this.repo.create(data);
    return this.repo.save(file);
  }

  async update(id: string, data: Partial<File>) {
    const file = await this.findOne(id);
    Object.assign(file, data);
    return this.repo.save(file);
  }

  async remove(id: string) {
    const file = await this.findOne(id);
    return this.repo.remove(file);
  }
}
