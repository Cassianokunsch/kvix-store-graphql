import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    ProductModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, '../schema.gql'),
      introspection: Boolean(process.env.GRAPHQL_INSTROSPECTION),
    }),
  ],
})
export class AppModule {}
