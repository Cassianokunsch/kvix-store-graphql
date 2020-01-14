import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { Customer, Gender } from '../../entities/Customer';

@InputType()
export class CreateCustomerInput implements Partial<Customer> {
  @Field()
  gender: Gender;

  @Field()
  cpf: string;

  @Field()
  cellPhone: string;
}
