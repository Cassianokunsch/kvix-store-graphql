import 'reflect-metadata';

import { GraphQLError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { createConnection } from 'typeorm';

import { ApolloServer } from 'apollo-server';

import { AppModule } from './modules/app.module';
import { getErrorCode, getErrorValidation } from './modules/helpers/errors';

async function startServer(): Promise<void> {
  await createConnection()
    .then(() => console.log('Database connect successfull'))
    .catch(error => {
      console.log(`Error to connect database:${error}`);
    });

  const { schema, context } = AppModule;

  const server = new ApolloServer({
    schema,
    context,
    formatError: (err: GraphQLError): any => {
      const error = getErrorCode(err.message);
      if (error) {
        return error;
      }

      if (err.originalError instanceof ArgumentValidationError) {
        return getErrorValidation(err.originalError);
      }

      return err;
    },
  });

  const serverInfo = await server.listen();

  console.log(`🚀  Server ready at ${serverInfo.url}`);
}

startServer();
