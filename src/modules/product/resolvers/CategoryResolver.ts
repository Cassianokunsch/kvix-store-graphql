import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { CategoryType } from '../schemas/types';
import { CategoryService } from '../services';
import { Upload } from '../UtilProduct';

@Resolver(CategoryType)
export class CategoryResolver {
  private _categoryService: CategoryService = new CategoryService();

  @Query(() => [CategoryType], { nullable: true })
  async categories(): Promise<CategoryType[]> {
    return (await this._categoryService.getAllCategories()) as CategoryType[];
  }

  @Mutation(() => CategoryType, { nullable: true })
  async createCategory(@Arg('file', () => GraphQLUpload) file: Upload, @Arg('name') name: string): Promise<CategoryType> {
    return (await this._categoryService.createCategory(file, name)) as CategoryType;
  }
}
