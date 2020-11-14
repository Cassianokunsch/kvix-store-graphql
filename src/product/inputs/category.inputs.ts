import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => ID)
  id: string;
}
