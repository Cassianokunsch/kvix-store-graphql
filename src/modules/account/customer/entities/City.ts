import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonContent } from '../../../helpers/entities/CommonContent';
import { Country } from './Country';

@ObjectType({ implements: CommonContent })
@Entity()
export class City extends CommonContent {
  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field(() => Country)
  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
