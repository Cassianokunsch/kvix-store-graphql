import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';

@ObjectType()
@Entity()
export class Country {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256, unique: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 2, unique: true })
  abbr: string;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
