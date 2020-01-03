import { rule } from 'graphql-shield';

import { errorName } from '../../../common/errors';

export const isAuthenticated = rule()(async (_parent, _args, _ctx) => {
  if (_ctx.currentUser) {
    return true;
  }

  return new Error(errorName.UNAUTHORIZED);
});
