import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import AddressResolver from './resolvers/address.resolvers';
import CityResolver from './resolvers/city.resolvers';
import CountryResolver from './resolvers/country.resolvers';
import CustomerResolver from './resolvers/customer.resolvers';

export const CustomerModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [CustomerResolver, AddressResolver, CityResolver, CountryResolver],
    }),
  ],
});
