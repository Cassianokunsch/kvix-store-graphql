import { Customer } from '../account/entity/Customer';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

export interface CurrentUser {
  id: string;
  name: string;
  roles: string;
}

export const getUser = async (token: string): Promise<CurrentUser> => {
  if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');
  const userId = verify(token, process.env.APP_SECRET);

  const user = await getRepository(Customer).findOneOrFail({ where: { id: userId } });
  return { id: user.id, roles: user.role, name: user.name };
};
