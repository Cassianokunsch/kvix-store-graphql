import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { Customer, Gender } from '../../entity/Customer';

@InputType()
export class CreateCustomerInput implements Partial<Customer> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  cpf: string;

  @Field()
  gender: Gender;

  @Field()
  cellPhone: string;
}
