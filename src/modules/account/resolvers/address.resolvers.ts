import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { Address } from '../entity/Address';
import { getRepository } from 'typeorm';
import { CreateAddressInput } from './input/address.inputs';
import { City } from '../entity/City';

export interface Context {
  user?: any;
}

@Resolver(Address)
class AddressResolver {
  @Query(() => [Address], { nullable: true })
  async addresses(): Promise<Address[]> {
    return await getRepository(Address).find();
  }

  @Mutation(() => Address)
  async createAddress(@Arg('input') input: CreateAddressInput, @Ctx() ctx: Context): Promise<Address> {
    console.log(ctx.user);

    const address = getRepository(Address).create({
      ...input,
      customer: {
        id: '16983565-909e-4e7c-9039-ea1ab72a2b75',
      },
      city: {
        id: input.cityId,
      },
    });
    await getRepository(Address).save(address);
    return address;
  }

  @FieldResolver()
  async city(@Root() address: Address): Promise<City> {
    const { city } = await getRepository(Address).findOneOrFail({ where: { id: address.id }, relations: ['city'] });
    return city;
  }
}

export default AddressResolver;
