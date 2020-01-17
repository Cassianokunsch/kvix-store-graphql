import { InputType, Field } from 'type-graphql';

import { ProductType } from '../types';

@InputType()
export class CreateProductInput implements Partial<ProductType> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  categoryId: string;

  @Field()
  brandId: string;
}
