import { Repository, getRepository } from 'typeorm';

import { Address, City } from '../entities';

export class AddressService {
  private _addressRepository: Repository<Address> = getRepository(Address);

  async getAllAddresses(): Promise<Address[]> {
    return await this._addressRepository.find();
  }

  async createAddress(cityId: string, neighborhood: string, number: string, street: string, customerId: string, complement: string): Promise<Address> {
    const address = this._addressRepository.create({
      neighborhood,
      number,
      street,
      complement,
      customer: {
        id: customerId,
      },
      city: {
        id: cityId,
      },
    });

    return await this._addressRepository.save(address);
  }

  async getFieldResolverCity(addressId: string): Promise<City> {
    const { city } = await this._addressRepository.findOneOrFail({ where: { id: addressId }, relations: ['city'] });
    return city;
  }
}
