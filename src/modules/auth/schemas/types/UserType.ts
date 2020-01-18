import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
