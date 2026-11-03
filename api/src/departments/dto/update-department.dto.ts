import { IsString, IsUUID, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}