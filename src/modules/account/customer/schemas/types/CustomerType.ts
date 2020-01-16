import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';

import { AddressType } from './';

export type Gender = 'MALE' | 'FEMALE';
@ObjectType()
export class CustomerType {
  @Field()
  id: string;

  @Field()
  cpf: string;

  @Field()
  cellPhone: string;

  @Field()
  gender: string;

  @Field(() => [AddressType], { nullable: true })
  addresses: AddressType[];
}
