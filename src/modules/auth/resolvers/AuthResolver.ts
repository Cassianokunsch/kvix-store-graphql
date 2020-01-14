import { Resolver, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { Customer } from '../../account/customer/schemas/types/CustomerType';
import { errorName } from '../../helpers/Errors';
import { LoginInput } from '../schemas/inputs/LoginInput';
import { SignUpInput } from '../schemas/inputs/SignInInput';
import { Payload } from '../schemas/types/PayloadType';

@Resolver()
export class AuthResolver {
  @Mutation(() => Payload)
  async login(@Arg('authInput') { email, password }: LoginInput): Promise<Payload> {
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
