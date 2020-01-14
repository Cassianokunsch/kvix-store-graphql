import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { Country } from './Country';

@ObjectType()
@Entity()
export class City {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field(() => Country)
  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
