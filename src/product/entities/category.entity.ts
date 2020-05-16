import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from '../../common/abstract.entity';

@ObjectType()
@Entity()
export class Category extends AbstractEntity {
  @Field()
  @Column('varchar', { length: 256 })
  name: string;

  @Field()
  @Column('text')
  imageUrl: string;
}
