import { verify } from 'jsonwebtoken';

interface CurrentUser {
  id: string;
  roles: [string];
}

export const getUser = (token: string): CurrentUser => {
  const userId = verify(token, 'junin');
  return { id: userId.toString(), roles: ['admin'] };
};
