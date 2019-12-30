import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import CustomerResolver from '../account/resolvers/customer.resolvers';
import AddressResolver from './resolvers/address.resolvers';
import CityResolver from './resolvers/city.resolvers';
import CountryResolver from './resolvers/country.resolvers';

export const AccountModule = new GraphQLModule({
  context: ({ req }) => {
    const token = req.get('Authorization');
    console.log(token);
    return { accoun: 'teste' };
  },
  extraSchemas: [
    buildSchemaSync({
      resolvers: [CustomerResolver, AddressResolver, CityResolver, CountryResolver],
    }),
  ],
});
