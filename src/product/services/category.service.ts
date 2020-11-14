import { Injectable } from '@nestjs/common';

import { Category } from '../database/entities/category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from '../inputs/category.inputs';
import { CategoryRepository } from '../repositories/category.repository';
import { ImageService } from './image.service';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository, private readonly imageService: ImageService) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const { path } = await this.imageService.processUpload(createCategoryInput.image);
    return await this.repository.insert({ name: createCategoryInput.name, imageUrl: path });
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  async disable(id: string): Promise<void> {
    await this.repository.fakeDelete({ id });
  }

  async findById(id: string): Promise<Category> {
    return await this.repository.findById(id);
  }

  async update(updateCategory: UpdateCategoryInput): Promise<Category> {
    return await this.repository.update(updateCategory.id, { ...updateCategory });
  }
}
