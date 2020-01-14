import { GraphQLModule } from '@graphql-modules/core';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/AuthModule';
import { resolversComposition } from './helpers/resolvers.composition';
import { ProductModule } from './product/product.module';

export const AppModule = new GraphQLModule({
  imports: [AccountModule, ProductModule, AuthModule],
  resolversComposition,
});
