import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  filename: string;

  @Column({ type: 'varchar', length: 256 })
  mimetype: string;

  @Column({ type: 'varchar', length: 256 })
  encoding: string;

  @Column({ type: 'text' })
  path: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
