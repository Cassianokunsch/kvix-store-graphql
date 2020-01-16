import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BrandType {
  @Field()
  id: string;

  @Field()
  name: string;
}
