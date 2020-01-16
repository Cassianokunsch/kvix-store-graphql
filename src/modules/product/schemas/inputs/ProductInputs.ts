import { InputType, Field } from 'type-graphql';

import { BrandType, CategoryType, ProductType } from '../types';

@InputType()
export class CreateProductInput implements Partial<ProductType> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  category: CategoryType;

  @Field()
  brand: BrandType;
}
