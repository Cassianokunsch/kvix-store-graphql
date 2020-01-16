import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';

import { CreateCityInput } from '../schemas/inputs';
import { CityType, CountryType } from '../schemas/types';
import { CityService } from '../services';

@Resolver(CityType)
export class CityResolver {
  private _cityService: CityService = new CityService();

  @Mutation(() => CityType)
  async createCityType(@Arg('input') { name, countryId }: CreateCityInput): Promise<CityType> {
    return await this._cityService.createCity(name, countryId);
  }

  @Query(() => [CityType], { nullable: true })
  async cities(): Promise<CityType[]> {
    return await this._cityService.getAllCities();
  }

  @FieldResolver()
  async country(@Root() cityType: CityType): Promise<CountryType> {
    return this._cityService.getFieldResolverCountry(cityType.id);
  }
}
