import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';

import { AddressType } from '../types';

@InputType()
export class CreateAddressInput implements Partial<AddressType> {
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
