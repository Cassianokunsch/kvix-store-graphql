import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { CustomerType, Gender } from '../types/CustomerType';

@InputType()
export class CreateCustomerInput implements Partial<CustomerType> {
  @Field()
  gender: Gender;

  @Field()
  cpf: string;

  @Field()
  cellPhone: string;
}
