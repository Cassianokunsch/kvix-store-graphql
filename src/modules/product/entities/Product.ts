import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Brand } from './Brand';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
