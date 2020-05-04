import { Query, Resolver } from '@nestjs/graphql';

import { CategoryService } from '../services/category.service';
import { Category } from '../data/entities/category.entity';

@Resolver(Category)
export class CategoryResolver {
  constructor(private readonly _service: CategoryService) {}

  @Query(() => [Category], { nullable: true })
  async categories(): Promise<Category[]> {
    return await this._service.findAll();
  }

  //   @Mutation(() => Category, { nullable: true })
  //   async createCategory(@Args('file', () => GraphQLUpload) file: Upload, @Args('name') name: string): Promise<Category> {
  //     return (await this._service.createCategory(file, name)) as Category;
  //   }
}
