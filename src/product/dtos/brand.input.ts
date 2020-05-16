import { Field, ArgsType } from '@nestjs/graphql';
import { FileUpload } from '../utils';
import { GraphQLUpload } from 'apollo-server-fastify';

@ArgsType()
export class CreateBrand {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
