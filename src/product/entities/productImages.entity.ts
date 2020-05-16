import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../common/abstract.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductImages extends AbstractEntity {
  @Column('text')
  filename: string;

  @Column('varchar', { length: 256 })
  mimetype: string;

  @Column('varchar', { length: 256 })
  encoding: string;

  @Field()
  @Column('text')
  path: string;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
