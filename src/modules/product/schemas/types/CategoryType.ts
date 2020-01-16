import { Field, ObjectType } from 'type-graphql';

import { ImageType } from './';

@ObjectType()
export class CategoryType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => ImageType)
  image: ImageType;
}
