import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';
import { Category, Brand } from './';
@Entity()
export class Product extends CommonCollumns {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
