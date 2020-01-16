import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { CreateCountryInput } from '../schemas/inputs/CountryInputs';
import { CountryType } from '../schemas/types/CountryType';
import { CountryService } from '../services/CountryService';

@Resolver(CountryType)
class CountryTypeResolver {
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

export default CountryTypeResolver;
