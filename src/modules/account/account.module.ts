import { GraphQLModule } from '@graphql-modules/core';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

export const AccountModule = new GraphQLModule({
  imports: [CustomerModule, AuthModule],
});
