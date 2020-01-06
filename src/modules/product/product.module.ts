import { buildSchemaSync } from 'type-graphql';

import { GraphQLModule } from '@graphql-modules/core';

import { BrandResolver } from './resolvers/brand.resolvers';
import { CategoryResolver } from './resolvers/category.resolvers';
import { ProductResolver } from './resolvers/product.resolvers';

export const ProductModule = new GraphQLModule({
  extraSchemas: [
    buildSchemaSync({
      resolvers: [BrandResolver, CategoryResolver, ProductResolver],
    }),
  ],
});
