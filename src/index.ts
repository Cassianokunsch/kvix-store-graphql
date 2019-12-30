import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { GraphQLModule } from '@graphql-modules/core';
import { AccountModule } from './modules/account/account.module';
import { createConnection } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';

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
