import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Connect {
  @Field()
  id: string;
}
