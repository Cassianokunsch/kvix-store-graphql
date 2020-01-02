import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { Address } from '../../entities/Address';

@InputType()
export class CreateAddressInput implements Partial<Address> {
  @Field()
  street: string;

  @Field()
  neighborhood: string;

  @Field()
  zipcode: string;

  @Field()
  number: string;

  @Field()
  complement: string;

  @Field()
  cityId: string;
}
