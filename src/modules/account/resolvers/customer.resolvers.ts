import 'reflect-metadata';
import { Customer } from '../entity/Customer';
import { getRepository } from 'typeorm';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { CreateCustomerInput } from './input/customer.inputs';
import { Address } from '../entity/Address';

@Resolver(Customer)
class CustomerResolver {
  @Mutation(() => Customer)
  async createCustomer(@Arg('input') input: CreateCustomerInput): Promise<Customer> {
    const customer = getRepository(Customer).create({ ...input, role: 'CUSTOMER' });
    return await getRepository(Customer).save(customer);
    //if (emailInUse) throw Error('Email is already in use!');
    //if (cpfExist) throw Error('CPF is already in use!');
  }

  @Query(() => [Customer], { nullable: true })
  async customers(@Ctx() ctx: any): Promise<Customer[]> {
    console.log(ctx?.currentUser);

    return await getRepository(Customer).find();
  }

  @FieldResolver()
  async addresses(@Root() customer: Customer): Promise<Address[]> {
    const { addresses } = await getRepository(Customer).findOneOrFail({ where: { id: customer.id }, relations: ['addresses'] });
    return addresses;
  }
}

export default CustomerResolver;
