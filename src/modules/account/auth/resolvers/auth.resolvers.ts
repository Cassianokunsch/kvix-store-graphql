import { Resolver, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { errorName } from '../../../helpers/errors';
import { Customer } from '../../customer/entities/Customer';
import { AuthInput } from './inputs/auth.input';
import { SignUpInput } from './inputs/signUp.input';
import { Payload } from './types/payload.type';

@Resolver()
export class AuthResolver {
  @Mutation(() => Payload)
  async login(@Arg('authInput') { email, password }: AuthInput): Promise<Payload> {
    const customer = await getRepository(Customer).findOne({ where: { email } });
    if (!customer) throw new Error(errorName.INVALID_CREDENTIALS);

    const valid = await compare(password, customer.password);
    if (!valid) throw new Error(errorName.INVALID_CREDENTIALS);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: customer.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }

  @Mutation(() => Payload)
  async signUp(@Arg('signUpInput') signUpInput: SignUpInput): Promise<Payload> {
    const { email, password, name, cpf, cellPhone, gender } = signUpInput;

    const queryResult = await getRepository(Customer)
      .createQueryBuilder('customer')
      .where('customer.cpf = :cpf OR customer.cell_phone = :cellPhone OR customers.email = :email', { cpf, cellPhone, email })
      .getOne();

    if (queryResult) {
      if (queryResult.cpf == cpf) throw Error('CPF is already in use!');

      if (queryResult.cellPhone == cellPhone) throw Error('Cellphone is already in use!');

      if (queryResult.email == email) throw new Error(errorName.EMAIL_ALREADY_USE);
    }

    const customerToCreate = getRepository(Customer).create({ email, password, name, cpf, cellPhone, gender });
    const customer = await getRepository(Customer).save(customerToCreate);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: customer.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
