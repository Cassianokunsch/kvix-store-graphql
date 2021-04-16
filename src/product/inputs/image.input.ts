import { Field, ID, InputType } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateImageInput {
  @Field(() => ID)
  productId: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
