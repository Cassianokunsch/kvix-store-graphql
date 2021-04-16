import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateProductnput {
  name: string;

  description: string;

  price: number;

  @Field(() => ID)
  brandId: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => [GraphQLUpload])
  images: FileUpload[];
}

@InputType()
export class UpdateProductInput extends PartialType(OmitType(CreateProductnput, ['images'])) {
  @Field(() => ID)
  id: string;
}
