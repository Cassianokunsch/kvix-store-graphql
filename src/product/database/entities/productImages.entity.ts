import { HideField, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductImages extends AbstractEntity {
  @HideField()
  @Column('text')
  filename: string;

  @HideField()
  @Column('varchar')
  mimetype: string;

  @HideField()
  @Column('varchar')
  encoding: string;

  @Column('text')
  path: string;

  @HideField()
  @ManyToOne(
    () => Product,
    product => product.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
