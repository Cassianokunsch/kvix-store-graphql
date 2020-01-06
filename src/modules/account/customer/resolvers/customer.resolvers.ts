import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../../shared/context';
import { Address } from '../entities/Address';
import { Customer } from '../entities/Customer';
import { CreateCustomerInput } from './input/customer.inputs';

@Resolver(Customer)
class CustomerResolver {
  @Mutation(() => Customer)
  async createCustomer(@Arg('input') input: CreateCustomerInput, @Ctx() ctx: Context): Promise<Customer> {
    const queryResult = await getRepository(Customer)
      .createQueryBuilder('customer')
      .where('customer.cpf = :cpf OR customer.cell_phone = :cellPhone', { cpf: input.cpf, cellPhone: input.cellPhone })
      .getOne();

    if (queryResult) {
      if (queryResult.cpf == input.cpf) {
        throw Error('CPF is already in use!');
      }

      if (queryResult.cellPhone == input.cellPhone) {
        throw Error('Cellphone is already in use!');
      }
    }

    const customer = getRepository(Customer).create({ ...input, userId: ctx.currentUser.id });
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
