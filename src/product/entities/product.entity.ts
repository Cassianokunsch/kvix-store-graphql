import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { ProductImages } from './productImages.entity';

@ObjectType()
@Entity()
export class Product extends AbstractEntity {
  @Field()
  @Column('varchar', { length: 256 })
  name: string;

  @Field()
  @Column('varchar', { length: 256 })
  description: string;

  @Field()
  @Column('decimal')
  price: number;

  @Field(() => Brand)
  @ManyToOne(
    () => Brand,
    brand => brand.id,
  )
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Field(() => Category)
  @ManyToOne(
    () => Category,
    category => category.id,
  )
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field(() => ProductImages)
  @OneToMany(
    type => ProductImages,
    productImages => productImages.product,
  )
  images: ProductImages[];
}
