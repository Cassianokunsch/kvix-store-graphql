import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { BrandResolver, CategoryResolver, ProductResolver } from './resolvers';

export const ProductModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [BrandResolver, CategoryResolver, ProductResolver],
    }),
  ],
});
