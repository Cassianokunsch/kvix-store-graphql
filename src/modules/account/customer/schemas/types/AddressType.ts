import 'reflect-metadata';

import { ObjectType, Field } from 'type-graphql';

import { City } from './CityType';
import { Customer } from './CustomerType';

@ObjectType()
export class Address {
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

  customer: Customer;

  @Field(() => City)
  city: City;
}
