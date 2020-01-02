import { rule } from 'graphql-shield';

export const isAuthenticated = rule()(async (_parent, _args, _ctx) => {
  if (_ctx.currentUser) {
    return true;
  }

  return false;
});
