export const authenticated = (next: (arg0: any, arg1: any, arg2: any, arg3: any) => any) => (root: any, args: any, context: { token: any }, info: any): any => {
  if (!context.token) {
    throw new Error(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};
