import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './resolvers/auth.resolvers';
import { getUser } from './util';

export const AuthModule = new GraphQLModule({
  context: ({ req }) => {
    let token = null;
    let currentUser = null;
    const authorization = req.get('Authorization');

    if (authorization) {
      token = authorization.replace('Bearer ', '');
      currentUser = getUser(token);
    } else {
      Error('We need a token');
    }

    return {
      token,
      currentUser,
    };
  },
  extraSchemas: [
    buildSchemaSync({
      resolvers: [AuthResolver],
    }),
  ],
});
