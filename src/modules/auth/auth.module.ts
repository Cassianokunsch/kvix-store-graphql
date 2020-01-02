import { AuthResolver } from './resolvers/auth.resolvers';
import { GraphQLModule } from '@graphql-modules/core';
import { applyMiddleware } from 'graphql-middleware';
import { buildSchemaSync } from 'type-graphql';
import { getCurrentUser } from './util';
import { permissions } from './permissions';

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
