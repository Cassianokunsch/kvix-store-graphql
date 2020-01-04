import { GraphQLModule } from '@graphql-modules/core';

import { CustomerModule } from './customer/customer.module';

export const AccountModule = new GraphQLModule({
  imports: [CustomerModule],
});
