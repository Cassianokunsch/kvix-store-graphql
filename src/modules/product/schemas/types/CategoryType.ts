import { Field, ObjectType } from 'type-graphql';

import { Image } from './';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Image)
  image: Image;
}
