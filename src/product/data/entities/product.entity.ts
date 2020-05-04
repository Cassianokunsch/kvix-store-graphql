import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@ObjectType()
@Entity()
export class Product extends AbstractEntity {
  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Field()
  @Column({ type: 'decimal' })
  price: number;

  @Field(() => Brand)
  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Field(() => Category)
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
