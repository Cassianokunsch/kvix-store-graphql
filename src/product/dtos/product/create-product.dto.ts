import { Field, ID, InputType } from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateProductDto {
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
