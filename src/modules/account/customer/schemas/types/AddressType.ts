import 'reflect-metadata';

import { ObjectType, Field } from 'type-graphql';

import { CityType } from './CityType';
import { CustomerType } from './CustomerType';

@ObjectType()
export class AddressType {
  @Field()
  id: string;

  @Field()
  street: string;

  @Field()
  neighborhood: string;

  @Field()
  zipcode: string;

  @Field()
  number: string;

  @Field()
  complement?: string;

  customer: CustomerType;

  @Field(() => CityType)
  city: CityType;
}
