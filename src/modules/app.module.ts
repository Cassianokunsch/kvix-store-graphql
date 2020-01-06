import { GraphQLModule } from '@graphql-modules/core';

import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';

export const AppModule = new GraphQLModule({
  imports: [AccountModule, ProductModule],
});
