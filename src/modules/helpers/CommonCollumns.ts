import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class CommonCollumns {
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
