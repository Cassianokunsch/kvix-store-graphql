import { Field, ObjectType } from 'type-graphql';

import { BrandType, CategoryType } from './';

@ObjectType()
export class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => BrandType)
  brand: BrandType;
}
