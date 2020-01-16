import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateCountryInput } from '../schemas/inputs';
import { CountryType } from '../schemas/types';
import { CountryService } from '../services';

@Resolver(CountryType)
export class CountryResolver {
  private _countryService: CountryService = new CountryService();

  @Mutation(() => CountryType)
  async createCountry(@Arg('input') { abbr, name }: CreateCountryInput): Promise<CountryType> {
    return await this._countryService.createCountry(abbr, name);
  }

  @Query(() => [CountryType], { nullable: true })
  async countries(): Promise<CountryType[]> {
    return await this._countryService.getAllCountries();
  }
}
