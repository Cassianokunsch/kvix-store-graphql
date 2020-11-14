import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';

@ObjectType()
@Entity()
export class Category extends AbstractEntity {
  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('text')
  imageUrl: string;
}
