import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { typeormConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ProductModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, '../schema.gql'),
    }),
  ],
})
export class AppModule {}
