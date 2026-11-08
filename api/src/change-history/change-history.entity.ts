import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('change_history')
export class ChangeHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'entity_type' })
  entityType: string;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId: string;

  @Column({ name: 'field_name' })
  fieldName: string;

  @Column({ name: 'old_value', nullable: true })
  oldValue: string;

  @Column({ name: 'new_value', nullable: true })
  newValue: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}