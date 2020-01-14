import { InputType, Field } from 'type-graphql';

import { MinLength, IsEmail } from 'class-validator';

import { Gender, Customer } from '../../../account/customer/entities/Customer';

@InputType()
export class SignUpInput implements Partial<Customer> {
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

  @Field()
  gender: Gender;
}
