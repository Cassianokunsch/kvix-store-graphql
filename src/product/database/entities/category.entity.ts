import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';

@ObjectType()
@Entity()
export class Category extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('text')
  imageUrl: string;
}
