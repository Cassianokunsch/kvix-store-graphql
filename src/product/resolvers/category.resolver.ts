import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { Category } from '../database/entities/category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from '../inputs/category.inputs';
import { CategoryService } from '../services/category.service';

@Resolver(Category)
export class CategoryResolver {
  constructor(private readonly service: CategoryService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.service.findAll();
  }

  @Query(() => Category)
  async category(@Args('id') id: string): Promise<Category> {
    return await this.service.findById(id);
  }

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput): Promise<Category> {
    return await this.service.create(createCategoryInput);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    return await this.service.update(updateCategoryInput);
  }

  @Mutation(() => Category)
  async disableCategory(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }
}
