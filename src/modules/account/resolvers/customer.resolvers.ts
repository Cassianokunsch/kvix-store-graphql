import 'reflect-metadata';
import { Customer } from '../entity/Customer';
import { getRepository } from 'typeorm';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { CreateCustomerInput } from './input/customer.inputs';
import { Address } from '../entity/Address';
import { hash } from 'bcryptjs';

@Resolver(Customer)
class CustomerResolver {
  @Mutation(() => Customer)
  async createCustomer(@Arg('input') input: CreateCustomerInput): Promise<Customer> {
    const { email, cellPhone, cpf, gender, name, password } = input;
    //return await getRepository(Customer).save({ ...customer, role: 'CUSTOMER' });

    //const emailInUse: boolean = await ctx.prisma.$exists.customer({ email });
    //if (emailInUse) throw Error('Email is already in use!');

    //const cpfExist: boolean = await ctx.prisma.$exists.customer({ cpf });
    //if (cpfExist) throw Error('CPF is already in use!');

    const passwordHash: string = await hash(password, 10);
    const customer = getRepository(Customer).create({
      email,
      cellPhone,
      cpf,
      gender,
      name,
      password: passwordHash,
      role: 'CUSTOMER',
    });

    return await getRepository(Customer).save(customer);
  }

  @Query(() => [Customer], { nullable: true })
  async customers(@Ctx() ctx: any): Promise<Customer[]> {
    console.log(ctx);

    return await getRepository(Customer).find();
  }

  @FieldResolver()
  async addresses(@Root() customer: Customer): Promise<Address[]> {
    const { addresses } = await getRepository(Customer).findOneOrFail({ where: { id: customer.id }, relations: ['addresses'] });
    return addresses;
  }
}

export default CustomerResolver;
