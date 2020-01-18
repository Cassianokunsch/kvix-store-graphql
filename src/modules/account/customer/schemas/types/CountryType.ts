import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CountryType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  abbr: string;
}
