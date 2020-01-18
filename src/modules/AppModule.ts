import { GraphQLModule } from '@graphql-modules/core';

import { AccountModule } from './account/AccountModule';
import { AuthModule } from './auth/AuthModule';
import { resolversComposition } from './helpers/ResolversComposition';
import { ProductModule } from './product/ProductModule';

export const AppModule = new GraphQLModule({
  imports: [AccountModule, ProductModule, AuthModule],
  resolversComposition,
});
