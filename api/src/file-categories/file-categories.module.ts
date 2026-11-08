import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileCategoriesController } from './file-categories.controller';
import { FileCategoriesService } from './file-categories.service';
import { FileCategory } from './file-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileCategory])],
  controllers: [FileCategoriesController],
  providers: [FileCategoriesService],
})
export class FileCategoriesModule {}