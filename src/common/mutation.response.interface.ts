import { InterfaceType, Field } from 'type-graphql';

@InterfaceType()
export abstract class MutationResponseInterface {
  @Field()
  code: string;
  @Field()
  success: boolean;
  @Field()
  message: string;
}
