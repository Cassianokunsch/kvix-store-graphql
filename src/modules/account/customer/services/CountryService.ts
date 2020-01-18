import { Repository, getRepository } from 'typeorm';

import { Country } from '../entities';

export class CountryService {
  private _cityRepository: Repository<Country> = getRepository(Country);

  async createCountry(abbr: string, name: string): Promise<Country> {
    const country = this._cityRepository.create({ abbr, name });
    return await this._cityRepository.save(country);
  }

  async getAllCountries(): Promise<Country[]> {
    return await this._cityRepository.find();
  }
}
