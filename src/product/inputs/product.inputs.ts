import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateProductnput {
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

  @Field(() => [GraphQLUpload])
  images: FileUpload[];
}

@InputType()
export class UpdateProductInput extends PartialType(OmitType(CreateProductnput, ['images'])) {
  @Field(() => ID)
  id: string;
}
