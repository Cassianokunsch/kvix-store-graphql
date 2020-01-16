import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Upload } from '../schemas/interfaces/UploadInterface';
import { Category } from '../schemas/types';
import { ImageResolver } from './';

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  async categories(): Promise<Category[]> {
    return await getRepository(Category).find();
  }

  @Mutation(() => Category)
  async createCategory(@Arg('file', () => GraphQLUpload) file: Upload, @Arg('name') name: string): Promise<Category> {
    const imageResolver = new ImageResolver();
    const image = await imageResolver.createImage(file);
    const categoryToCreate = getRepository(Category).create({ name, image: { id: image.id } });
    return await getRepository(Category).save(categoryToCreate);
  }
}
