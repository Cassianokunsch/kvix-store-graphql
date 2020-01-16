import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { CityType } from '../types';

@InputType()
export class CreateCityInput implements Partial<CityType> {
  @Field()
  name: string;

  @Field()
  countryId: string;
}
