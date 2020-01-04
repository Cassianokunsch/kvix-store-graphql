import { InputType, Field } from 'type-graphql';

import { MinLength, IsEmail } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
