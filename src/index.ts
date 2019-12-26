import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { GraphQLModule } from '@graphql-modules/core';

import { CustomerModule } from './modules/customer/customer.module';
import { createConnection } from 'typeorm';

const { schema, context } = new GraphQLModule({
  imports: [CustomerModule],
});

async function startServer(): Promise<void> {
  await createConnection();

  const server = new ApolloServer({ schema, context });

  server
    .listen()
    .then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    })
    .catch(error => console.log(error));
}

startServer();
