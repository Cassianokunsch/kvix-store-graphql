import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ImageType {
  @Field()
  id: string;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  path: string;
}
