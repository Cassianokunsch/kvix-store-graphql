import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { Customer, Gender } from '../../entities/Customer';

@InputType()
export class CreateCustomerInput implements Partial<Customer> {
  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  gender: Gender;

  @Field()
  cellPhone: string;
}
