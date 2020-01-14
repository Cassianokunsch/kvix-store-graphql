import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { AuthResolver } from './resolvers/AuthResolver';
import { getCurrentUser } from './Util';

export const AuthModule = new GraphQLModule({
  context: async ({ req }): Promise<object> => {
    let currentUser;
    let token;
    const authorization = req.get('Authorization');

    if (authorization) {
      token = authorization.replace('Bearer ', '');
      currentUser = await getCurrentUser(token);
    }

    return { currentUser };
  },
  extraSchemas: [
    buildSchemaSync({
      resolvers: [AuthResolver],
    }),
  ],
});
