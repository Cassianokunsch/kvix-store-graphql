import { InputType, Field } from 'type-graphql';

import { Category } from '../../entities';

@InputType()
export class CreateCategoryInput implements Partial<Category> {
  @Field()
  name: string;
}
