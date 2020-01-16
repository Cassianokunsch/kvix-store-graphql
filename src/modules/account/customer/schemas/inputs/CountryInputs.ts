import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { CountryType } from '../types/CountryType';

@InputType()
export class CreateCountryInput implements Partial<CountryType> {
  @Field()
  name: string;

  @Field()
  abbr: string;
}
