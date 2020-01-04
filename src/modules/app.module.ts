import { GraphQLModule } from '@graphql-modules/core';

import { AccountModule } from './account/account.module';

export const AppModule = new GraphQLModule({
  imports: [AccountModule],
});
