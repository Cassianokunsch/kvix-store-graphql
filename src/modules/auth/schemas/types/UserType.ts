import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
