import { GraphQLModule } from '@graphql-modules/core';

import { CustomerModule } from './customer/CustomerModule';

export const AccountModule = new GraphQLModule({
  imports: [CustomerModule],
});
