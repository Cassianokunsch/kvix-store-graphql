import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonContent } from '../../../shared/entities/CommonContent';
import { Address } from './Address';

export type Gender = 'MALE' | 'FEMALE';

@ObjectType()
@Entity()
export class Customer extends CommonContent {
  @Field(() => [Address], { nullable: true })
  @OneToMany(
    () => Address,
    c => c.customer,
  )
  addresses: Address[];

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
}
