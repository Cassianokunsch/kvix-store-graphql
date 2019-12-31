import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { Customer } from '../../account/entity/Customer';
import { Resolver, Mutation, Field, ArgsType, Args } from 'type-graphql';
import { sign } from 'jsonwebtoken';

export const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

@ArgsType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(@Args() { email, password }: LoginInput): Promise<string> {
    //if (!parseEmail.test(email)) throw Error('Bad email format!');

    const customer = await getRepository(Customer).findOne({ where: { email } });
    if (!customer) throw Error('Invalid Credentials!');

    const valid = await compare(password, customer.password);
    if (!valid) throw Error('Invalid Credentials!');

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return sign(customer.id, process.env.APP_SECRET);
  }
}
