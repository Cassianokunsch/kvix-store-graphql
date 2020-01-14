import * as rules from '../auth/Rules';

export const resolversComposition = {
  'Query.customers': [rules.isAuthenticated()],
};
