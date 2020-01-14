import { InputType, Field } from 'type-graphql';

import { Product } from '../../entities/Product';

@InputType()
export class CreateProductInput implements Partial<Product> {
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
