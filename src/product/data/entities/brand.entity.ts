import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractEntity } from '../../../common/abstract.entity';

@Entity()
@ObjectType()
export class Brand extends AbstractEntity {
  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;
}
