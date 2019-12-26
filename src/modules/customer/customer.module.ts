import { GraphQLModule } from '@graphql-modules/core';
import { default as CustomerTypeDefs } from './schema';
import { default as CustomerResolvers } from './resolvers';

export const CustomerModule = new GraphQLModule({
  typeDefs: CustomerTypeDefs,
  resolvers: CustomerResolvers,
});
