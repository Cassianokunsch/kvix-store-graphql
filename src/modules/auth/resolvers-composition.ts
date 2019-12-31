import { authenticated } from './authenticated-guard';

export const resolversComposition = {
  'Query.customers': [authenticated],
};
