import { Field, ObjectType } from 'type-graphql';

import { Brand } from './';
import { Category } from './';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => Category)
  category: Category;

  @Field(() => Brand)
  brand: Brand;
}
