import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';

import { CountryType } from './';

@ObjectType()
export class CityType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => CountryType)
  country: CountryType;
}
