import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Payload {
  @Field()
  token: string;
}
