import 'reflect-metadata';
import { Customer } from '../entities/Customer';
import { getRepository } from 'typeorm';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { CreateCustomerInput } from './input/customer.inputs';
import { Address } from '../entities/Address';

@Resolver(Customer)
class CustomerResolver {
  @Mutation(() => Customer)
  async createCustomer(@Arg('input') input: CreateCustomerInput): Promise<Customer> {
    const customer = getRepository(Customer).create({ ...input });
    return await getRepository(Customer).save(customer);
    //if (emailInUse) throw Error('Email is already in use!');
    //if (cpfExist) throw Error('CPF is already in use!');
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
