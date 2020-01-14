import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { getRepository } from 'typeorm';

import { CreateCountryInput } from '../schemas/inputs/CountryInputs';
import { Country } from '../schemas/types/CountryType';

@Resolver(Country)
class CountryResolver {
  @Mutation(() => Country)
  async createCountry(@Arg('input') input: CreateCountryInput): Promise<Country> {
    const country = getRepository(Country).create(input);
    return await getRepository(Country).save(country);
  }

  @Query(() => [Country], { nullable: true })
  async countries(): Promise<Country[]> {
    return await getRepository(Country).find();
  }
}

export default CountryResolver;
