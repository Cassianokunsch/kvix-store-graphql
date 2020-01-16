import { InputType, Field } from 'type-graphql';

import { MinLength, IsEmail } from 'class-validator';

import { UserType } from '../types/UserType';

@InputType()
export class SignUpInput implements Partial<UserType> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  name: string;
}
