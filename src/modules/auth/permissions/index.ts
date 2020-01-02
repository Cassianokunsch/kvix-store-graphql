import * as rules from './rules';

import { shield } from 'graphql-shield';

export const permissions = shield({
  Query: {
    customers: rules.isAuthenticated,
  },
  // Mutation: {
  //   createProduct: and(rules.isAuthenticated, rules.isManager),
  //   updateProduct: and(rules.isAuthenticated, rules.isManager),
  //   deleteProduct: and(rules.isAuthenticated, rules.isManager),
  //   createOrder: rules.isAuthenticated,
  //   cancelOrder: and(rules.isAuthenticated, rules.isOwnerOfOrder),
  //   //createManager: and(rules.isAuthenticated, rules.isManager),
  // },
  // Product: {
  //   store: and(rules.isAuthenticated, rules.isManager),
  // },
});
