import { Repository, getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { errorName } from '../../helpers/Errors';
import { User } from '../entities';
import { Payload } from '../schemas/types';

export class AuthService {
  private _userRepository: Repository<User> = getRepository(User);

  async login(email: string, password: string): Promise<Payload> {
    const user = await this._userRepository.findOne({ where: { email } });
    if (!user) throw new Error(errorName.INVALID_CREDENTIALS);

    const valid = await compare(password, user.password);
    if (!valid) throw new Error(errorName.INVALID_CREDENTIALS);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }

  async signUp(email: string, name: string, password: string): Promise<Payload> {
    const query = await this._userRepository.findOne({ where: { email } });
    if (query) throw new Error(errorName.EMAIL_ALREADY_USE);

    const userToCreate = this._userRepository.create({ email, password, name });
    const user = await this._userRepository.save(userToCreate);

    if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');

    return { token: sign({ id: user.id, role: 'SOME RULES' }, process.env.APP_SECRET) };
  }
}
