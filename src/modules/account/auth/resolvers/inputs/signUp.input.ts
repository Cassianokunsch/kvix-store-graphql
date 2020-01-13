import { InputType, Field } from 'type-graphql';

import { MinLength, IsEmail } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  cellPhone: string;
}
