import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Country } from '../entities/Country';
import { CreateCountryInput } from './inputs/country.inputs';

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
