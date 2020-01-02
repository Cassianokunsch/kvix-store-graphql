import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { Resolver, Mutation, Field, ArgsType, Args } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';
import { Payload } from './types/payload.type';

export const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

@ArgsType()
class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => Payload)
  async login(@Args() { email, password }: AuthInput): Promise<Payload> {
    //if (!parseEmail.test(email)) throw Error('Bad email format!');

    const user = await getRepository(User).findOne({ where: { email } });
    if (!user) throw Error('Invalid Credentials!');

    const valid = await compare(password, user.password);
    if (!valid) throw Error('Invalid Credentials!');

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }

  @Mutation(() => Payload)
  async signUp(@Args() { email, password }: AuthInput): Promise<Payload> {
    const user = getRepository(User).create({ email, password });
    await getRepository(User).save(user);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
