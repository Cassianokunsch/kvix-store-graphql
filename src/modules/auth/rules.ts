import { errorName } from '../helpers/errors';

export const isAuthenticated = () => (resolver: (arg0: any, arg1: any, arg2: any, arg3: any) => any) => async (root: any, args: any, context: { currentUser: any }, info: any): Promise<any> => {
  if (!context.currentUser) {
    throw new Error(errorName.UNAUTHORIZED);
  }

  return resolver(root, args, context, info);
};
