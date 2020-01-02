import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import { City } from '../entities/City';
import { Country } from '../entities/Country';
import { CreateCityInput } from './input/city.inputs';

@Resolver(City)
class CityResolver {
  @Mutation(() => City)
  async createCity(@Arg('input') input: CreateCityInput): Promise<City> {
    const { name, countryId } = input;
    const city = getRepository(City).create({ name, country: { id: countryId } });
    return await getRepository(City).save(city);
  }

  @Query(() => [City], { nullable: true })
  async cities(): Promise<City[]> {
    return await getRepository(City).find();
  }

  @FieldResolver()
  async country(@Root() city: City): Promise<Country> {
    const { country } = await getRepository(City).findOneOrFail({ where: { id: city.id }, relations: ['country'] });
    return country;
  }
}

export default CityResolver;
