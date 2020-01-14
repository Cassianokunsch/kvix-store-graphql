import * as rules from '../auth/rules';

export const resolversComposition = {
  'Query.customers': [rules.isAuthenticated()],
};
