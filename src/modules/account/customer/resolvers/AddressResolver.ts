import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';

import { Context } from '../../../helpers/Context';
import { CreateAddressInput } from '../schemas/inputs/AddressInputs';
import { AddressType } from '../schemas/types/AddressType';
import { CityType } from '../schemas/types/CityType';
import { AddressService } from '../services/AddressService';

@Resolver(AddressType)
class AddressResolver {
  private _addressService: AddressService = new AddressService();

  @Query(() => [AddressType], { nullable: true })
  async addresses(): Promise<AddressType[]> {
    return await this._addressService.getAllAddresses();
  }

  @Mutation(() => AddressType)
  async createAddress(@Arg('input') createAddressInput: CreateAddressInput, @Ctx() { currentUser }: Context): Promise<AddressType> {
    const { cityId, neighborhood, number, street, complement } = createAddressInput;
    return await this._addressService.createAddress(cityId, neighborhood, number, street, currentUser.id, complement);
  }

  @FieldResolver()
  async city(@Root() address: AddressType): Promise<CityType> {
    return this._addressService.getFieldResolverCity(address.id);
  }
}

export default AddressResolver;
