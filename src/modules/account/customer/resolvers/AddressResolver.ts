import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';

import { Context } from '../../../helpers/Context';
import { CreateAddressInput } from '../schemas/inputs';
import { AddressType, CityType } from '../schemas/types';
import { AddressService } from '../services';

@Resolver(AddressType)
export class AddressResolver {
  private _addressService: AddressService = new AddressService();

  @Query(() => [AddressType], { nullable: true })
  async addresses(): Promise<AddressType[]> {
    return (await this._addressService.getAllAddresses()) as AddressType[];
  }

  @Mutation(() => AddressType, { nullable: true })
  async createAddress(@Arg('createAddressInput') createAddressInput: CreateAddressInput, @Ctx() { currentUser }: Context): Promise<AddressType> {
    const { cityId, neighborhood, number, street, complement } = createAddressInput;
    return (await this._addressService.createAddress(cityId, neighborhood, number, street, currentUser.id, complement)) as AddressType;
  }

  @FieldResolver()
  async city(@Root() address: AddressType): Promise<CityType> {
    return (await this._addressService.getFieldResolverCity(address.id)) as CityType;
  }
}
