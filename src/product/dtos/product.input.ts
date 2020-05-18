import { Field, ID, InputType } from '@nestjs/graphql';

import { FileUpload } from '../utils';
import { GraphQLUpload } from 'apollo-server-fastify';

@InputType()
export class CreateProduct {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => ID)
  brandId: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
