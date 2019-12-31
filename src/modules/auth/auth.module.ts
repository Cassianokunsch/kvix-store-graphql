import { AuthResolver } from './resolvers/auth.resolvers';
import { CurrentUser } from './util';
import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { getUser } from './util';
import { resolversComposition } from './resolvers-composition';

interface AuthContext {
  currentUser?: CurrentUser;
}

export const AuthModule = new GraphQLModule({
  context: async ({ req }): Promise<AuthContext> => {
    let currentUser;
    const authorization = req.get('Authorization');

    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      currentUser = await getUser(token);
    }

    return {
      currentUser,
    };
  },
  extraSchemas: [
    buildSchemaSync({
      resolvers: [AuthResolver],
    }),
  ],
  resolversComposition,
});
