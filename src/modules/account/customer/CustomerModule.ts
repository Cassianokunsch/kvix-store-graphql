import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { AddressResolver, CityResolver, CountryResolver, CustomerResolver } from './resolvers';

export const CustomerModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [CustomerResolver, AddressResolver, CityResolver, CountryResolver],
    }),
  ],
});
