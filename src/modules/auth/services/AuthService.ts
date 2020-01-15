import { Repository, getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { Customer } from '../../account/customer/entities/Customer';
import { errorName } from '../../helpers/Errors';
import { SignUpInput } from '../schemas/inputs/SignInInput';
import { Payload } from '../schemas/types/PayloadType';

export class AuthService {
  private _customerRepository: Repository<Customer> = getRepository(Customer);

  async login(email: string, password: string): Promise<Payload> {
    const customer = await this._customerRepository.findOne({ where: { email } });
    if (!customer) throw new Error(errorName.INVALID_CREDENTIALS);

    const valid = await compare(password, customer.password);
    if (!valid) throw new Error(errorName.INVALID_CREDENTIALS);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: customer.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }

  async signUp(signUpInput: SignUpInput): Promise<Payload> {
    const { email, password, name, cpf, cellPhone, gender } = signUpInput;

    const queryResult = await this._customerRepository
      .createQueryBuilder('customer')
      .where('customer.cpf = :cpf OR customer.cell_phone = :cellPhone OR customer.email = :email', { cpf, cellPhone, email })
      .getOne();

    if (queryResult) {
      if (queryResult.cpf == cpf) throw Error('CPF is already in use!');

      if (queryResult.cellPhone == cellPhone) throw Error('Cellphone is already in use!');

      if (queryResult.email == email) throw new Error(errorName.EMAIL_ALREADY_USE);
    }

    const customerToCreate = this._customerRepository.create({ email, password, name, cpf, cellPhone, gender });
    const customer = await this._customerRepository.save(customerToCreate);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: customer.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
