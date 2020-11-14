import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateBrandInput {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => ID)
  id: string;
}
