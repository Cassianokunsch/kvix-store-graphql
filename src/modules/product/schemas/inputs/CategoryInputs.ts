import { InputType, Field } from 'type-graphql';

import { CategoryType } from '../types';

@InputType()
export class CreateCategoryInput implements Partial<CategoryType> {
  @Field()
  name: string;
}
