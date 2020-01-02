import { verify } from 'jsonwebtoken';

export const getCurrentUser = async (token: string): Promise<string | object> => {
  if (!process.env.APP_SECRET) throw Error('Erro to get APP_SECRET');
  const currentUser: string | object = verify(token, process.env.APP_SECRET);

  return currentUser;
};
