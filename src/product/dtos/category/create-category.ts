import { Field, ArgsType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@ArgsType()
export class CreateCategoryDto {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
