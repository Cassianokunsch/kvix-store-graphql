import { Repository, getRepository } from 'typeorm';

import { City } from '../entities/City';
import { Country } from '../entities/Country';

export class CityService {
  private _cityRepository: Repository<City> = getRepository(City);

  async createCity(name: string, countryId: string): Promise<City> {
    const city = this._cityRepository.create({ name, country: { id: countryId } });
    return await this._cityRepository.save(city);
  }

  async getAllCities(): Promise<City[]> {
    return await getRepository(City).find();
  }

  async getFieldResolverCountry(cityId: string): Promise<Country> {
    const { country } = await this._cityRepository.findOneOrFail({ where: { id: cityId }, relations: ['country'] });
    return country;
  }
}
