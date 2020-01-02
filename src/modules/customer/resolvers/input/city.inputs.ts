import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { City } from '../../entities/City';

@InputType()
export class CreateCityInput implements Partial<City> {
  @Field()
  name: string;

  @Field()
  countryId: string;
}
