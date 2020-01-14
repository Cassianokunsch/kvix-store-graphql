import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../../helpers/Context';
import { CreateAddressInput } from '../schemas/inputs/AddressInputs';
import { Address } from '../schemas/types/AddressType';
import { City } from '../schemas/types/CityType';

@Resolver(Address)
class AddressResolver {
  @Query(() => [Address], { nullable: true })
  async addresses(): Promise<Address[]> {
    return await getRepository(Address).find();
  }

  @Mutation(() => Address)
  async createAddress(@Arg('input') input: CreateAddressInput, @Ctx() ctx: Context): Promise<Address> {
    const address = getRepository(Address).create({
      ...input,
      customer: {
        id: ctx.currentUser.id,
      },
      city: {
        id: input.cityId,
      },
    });

    return await getRepository(Address).save(address);
  }

  @FieldResolver()
  async city(@Root() address: Address): Promise<City> {
    const { city } = await getRepository(Address).findOneOrFail({ where: { id: address.id }, relations: ['city'] });
    return city;
  }
}

export default AddressResolver;