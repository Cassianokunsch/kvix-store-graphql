import { HideField, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { ProductImages } from './productImages.entity';

@ObjectType()
@Entity()
export class Product extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('float8')
  price: number;

  @ManyToOne(
    () => Brand,
    brand => brand.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @HideField()
  @Column({ type: 'uuid', name: 'brand_id' })
  brandId: string;

  @ManyToOne(
    () => Category,
    category => category.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @HideField()
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @OneToMany(
    () => ProductImages,
    productImages => productImages.product,
    { nullable: false },
  )
  images: ProductImages[];
}
