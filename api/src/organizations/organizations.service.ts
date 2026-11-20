import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, QueryFailedError } from 'typeorm';
import { Organization } from './organizations.entity';
import { Department } from '../departments/departments.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly repo: Repository<Organization>,

    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  findAll() {
    return this.repo.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: string) {
    const org = await this.repo.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!org) {
      throw new NotFoundException('Организация не найдена');
    }

    return org;
  }

  async create(data: CreateOrganizationDto) {
    const org = this.repo.create(data);

    try {
      return await this.repo.save(org);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async update(id: string, data: UpdateOrganizationDto) {
    const org = await this.findOne(id);

    Object.assign(org, data);

    try {
      return await this.repo.save(org);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async remove(id: string) {
    const org = await this.findOne(id);

    const departmentsCount = await this.departmentRepo.count({
      where: {
        organizationId: id,
        deletedAt: IsNull(),
      },
    });

    if (departmentsCount > 0) {
      throw new ConflictException(
        'Нельзя удалить организацию, пока в ней есть активные отделы',
      );
    }

    org.deletedAt = new Date();

    return this.repo.save(org);
  }

  private handleDatabaseError(error: unknown): never {
    if (error instanceof QueryFailedError) {
      const databaseError = error.driverError as {
        code?: string;
        constraint?: string;
      };

      if (
        databaseError.code === '23505' &&
        databaseError.constraint === 'organizations_name_unique'
      ) {
        throw new ConflictException(
          'Организация с таким названием уже существует',
        );
      }
    }

    throw error;
  }
}
