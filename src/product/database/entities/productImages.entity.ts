import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductImages extends AbstractEntity {
  @Column('text')
  filename: string;

  @Column('varchar')
  mimetype: string;

  @Column('varchar')
  encoding: string;

  @Field()
  @Column('text')
  path: string;

  @ManyToOne(
    () => Product,
    product => product.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
