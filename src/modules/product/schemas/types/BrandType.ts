import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Brand {
  @Field()
  id: string;

  @Field()
  name: string;
}
