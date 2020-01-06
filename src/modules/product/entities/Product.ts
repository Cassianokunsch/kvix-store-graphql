import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Brand } from './Brand';
import { Category } from './Category';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Field()
  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
