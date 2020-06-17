import { Field, ObjectType } from '@nestjs/graphql';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { ProductImages } from './productImages.entity';

@ObjectType()
@Entity()
export class Product extends AbstractEntity {
  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  description: string;

  @Field()
  @Column('decimal', { precision: 2 })
  price: number;

  @Field(() => Brand)
  @ManyToOne(
    () => Brand,
    brand => brand.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column({ type: 'uuid', name: 'brand_id' })
  brandId: string;

  @Field(() => Category)
  @ManyToOne(
    () => Category,
    category => category.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @Field(() => [ProductImages])
  @OneToMany(
    () => ProductImages,
    productImages => productImages.product,
    { nullable: false },
  )
  images: ProductImages[];
}
