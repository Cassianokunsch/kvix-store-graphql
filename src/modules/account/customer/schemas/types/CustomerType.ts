import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';

import { User } from '../../../../auth/schemas/types/UserType';
import { Address } from './AddressType';

export type Gender = 'MALE' | 'FEMALE';

@ObjectType({ implements: User })
export class Customer extends User {
  @Field()
  cpf: string;

  @Field()
  cellPhone: string;

  @Field()
  gender: Gender;

  @Field(() => [Address], { nullable: true })
  addresses: Address[];
}
