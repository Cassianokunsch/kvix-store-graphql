import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';

import { Country } from './CountryType';

@ObjectType()
export class City {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Country)
  country: Country;
}
