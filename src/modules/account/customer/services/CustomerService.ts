import { getRepository, Repository } from 'typeorm';

import { Address } from '../entities/Address';
import { Customer } from '../entities/Customer';

export class CustomerService {
  private _customerRepository: Repository<Customer> = getRepository(Customer);

  async createCustomer(cellPhone: string, cpf: string, gender: string): Promise<Customer> {
    const queryResult = await this._customerRepository
      .createQueryBuilder('customer')
      .where('customer.cpf = :cpf OR customer.cell_phone = :cellPhone', { cpf, cellPhone })
      .getOne();

    if (queryResult) {
      if (queryResult.cpf == cpf) throw Error('CPF is already in use!');

      if (queryResult.cellPhone == cellPhone) throw Error('Cellphone is already in use!');
    }

    const customer = this._customerRepository.create({ cellPhone, cpf, gender });

    return await this._customerRepository.save(customer);
  }

  async getFieldResolverAddress(customerId: string): Promise<Address[]> {
    const { addresses } = await this._customerRepository.findOneOrFail({ where: { id: customerId }, relations: ['addresses'] });

    return addresses;
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this._customerRepository.find();
  }
}
