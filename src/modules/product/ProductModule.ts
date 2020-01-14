import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { BrandResolver } from './resolvers/BrandResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { ProductResolver } from './resolvers/ProductResolver';

export const ProductModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [BrandResolver, CategoryResolver, ProductResolver],
    }),
  ],
});
