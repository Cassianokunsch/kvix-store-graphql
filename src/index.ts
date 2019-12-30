import 'reflect-metadata';

import { AccountModule } from './modules/account/account.module';
import { ApolloServer } from 'apollo-server';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@graphql-modules/core';
import { createConnection } from 'typeorm';

const { schema, context } = new GraphQLModule({
  imports: [AccountModule, AuthModule],
});

async function startServer(): Promise<void> {
  await createConnection()
    .then(() => console.log('Database conect successful'))
    .catch(error => {
      console.log(`Error to connect database:${error}`);
    });

  const server = new ApolloServer({
    schema,
    context,
  });

  const serverInfo = await server.listen();

  console.log(`🚀  Server ready at ${serverInfo.url}`);
}

startServer();
