import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import AddressResolver from './resolvers/AddressResolver';
import CityResolver from './resolvers/CityResolver';
import CountryResolver from './resolvers/CountryResolver';
import CustomerResolver from './resolvers/CustomerResolver';

export const CustomerModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [CustomerResolver, AddressResolver, CityResolver, CountryResolver],
    }),
  ],
});
