import { InputType, Field } from 'type-graphql';

import { MinLength, IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
