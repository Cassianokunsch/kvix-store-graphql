import { Resolver, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { errorName } from '../../../shared/errors';
import { User } from '../entities/User';
import { AuthInput } from './inputs/auth.input';
import { SignUpInput } from './inputs/signUp.input';
import { Payload } from './types/payload.type';

@Resolver()
export class AuthResolver {
  @Mutation(() => Payload)
  async login(@Arg('authInput') { email, password }: AuthInput): Promise<Payload> {
    const user = await getRepository(User).findOne({ where: { email } });
    if (!user) throw new Error(errorName.INVALID_CREDENTIALS);

    const valid = await compare(password, user.password);
    if (!valid) throw new Error(errorName.INVALID_CREDENTIALS);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }

  @Mutation(() => Payload)
  async signUp(@Arg('signUpInput') signUpInput: SignUpInput): Promise<Payload> {
    const { email, password, cellPhone, cpf, name } = signUpInput;

    const queryResult = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.cpf = :cpf OR user.cell_phone = :cellPhone OR user.email = :email', { cpf, cellPhone, email })
      .getOne();

    if (queryResult) {
      if (queryResult.cpf == cpf) throw Error('CPF is already in use!');

      if (queryResult.cellPhone == cellPhone) throw Error('Cellphone is already in use!');

      if (queryResult.email == email) throw new Error(errorName.EMAIL_ALREADY_USE);
    }

    const userToCreate = getRepository(User).create({ email, password, cellPhone, cpf, name });
    const user = await getRepository(User).save(userToCreate);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
