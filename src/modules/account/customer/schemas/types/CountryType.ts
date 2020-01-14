import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Country {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  abbr: string;
}
