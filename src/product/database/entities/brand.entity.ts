import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';

@Entity()
@ObjectType()
export class Brand extends AbstractEntity {
  @Column('varchar')
  name: string;

  @Column('text')
  imageUrl: string;
}
