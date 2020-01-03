import { Resolver, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { errorName } from '../../../common/errors';
import { User } from '../entities/User';
import { AuthInput } from './inputs/auth.input';
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
  async signUp(@Arg('authInput') { email, password }: AuthInput): Promise<Payload> {
    const existUser = await getRepository(User).findOne({ where: { email } });
    if (existUser) throw new Error(errorName.EMAIL_ALREADY_USE);

    const userToCreate = getRepository(User).create({ email, password });
    const user = await getRepository(User).save(userToCreate);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
