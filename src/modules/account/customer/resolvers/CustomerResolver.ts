import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import { CreateCustomerInput } from '../schemas/inputs/CustomerInputs';
import { Address } from '../schemas/types/AddressType';
import { Customer } from '../schemas/types/CustomerType';

@Resolver(Customer)
class CustomerResolver {
  @Mutation(() => Customer)
  async createCustomer(@Arg('input') input: CreateCustomerInput): Promise<Customer> {
    const customer = getRepository(Customer).create({ ...input });
    return await getRepository(Customer).save(customer);
  }

  @Query(() => [Customer], { nullable: true })
  async customers(): Promise<Customer[]> {
    return await getRepository(Customer).find();
  }

  @FieldResolver()
  async addresses(@Root() customer: Customer): Promise<Address[]> {
    const { addresses } = await getRepository(Customer).findOneOrFail({ where: { id: customer.id }, relations: ['addresses'] });
    return addresses;
  }
}

export default CustomerResolver;