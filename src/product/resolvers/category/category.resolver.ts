import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { CreateCategoryDto } from '../../dtos/category/create-category';
import { Category } from '../../entities/category.entity';
import { CategoryService } from '../../services/category/category.service';

@Resolver(Category)
export class CategoryResolver {
  constructor(private readonly service: CategoryService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.service.findAll();
  }

  @Mutation(() => Category)
  async createCategory(@Args() { name, image }: CreateCategoryDto): Promise<Category> {
    return await this.service.create(name, image);
  }

  @Mutation(() => Category)
  async disableCategory(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }
}
