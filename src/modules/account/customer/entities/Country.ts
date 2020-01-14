import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { CommonContent } from '../../../helpers/entities/CommonContent';

@ObjectType({ implements: CommonContent })
@Entity()
export class Country extends CommonContent {
  @Field()
  @Column({ type: 'varchar', length: 256, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 2, unique: true })
  abbr: string;
}
