import { applyMiddleware } from 'graphql-middleware';
import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { permissions } from './permissions';
import { AuthResolver } from './resolvers/auth.resolvers';
import { getCurrentUser } from './util';

const typeSchema = buildSchemaSync({
  resolvers: [AuthResolver],
});

const shieldSchema = applyMiddleware(typeSchema, permissions);

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
  extraSchemas: [shieldSchema],
});
