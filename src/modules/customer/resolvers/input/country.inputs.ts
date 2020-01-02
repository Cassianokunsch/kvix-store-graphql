import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { Country } from '../../entities/Country';

@InputType()
export class CreateCountryInput implements Partial<Country> {
  @Field()
  name: string;

  @Field()
  abbr: string;
}
