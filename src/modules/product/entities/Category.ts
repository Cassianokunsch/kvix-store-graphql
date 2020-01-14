import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Image } from './Image';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
