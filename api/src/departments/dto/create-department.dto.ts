import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}