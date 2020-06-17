import { Injectable } from '@nestjs/common';

import { FileUpload } from 'graphql-upload';

import { Category } from '../../entities/category.entity';
import { ImageService } from '../image/image.service';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository, private readonly imageService: ImageService) {}

  async create(name: string, upload: FileUpload): Promise<Category> {
    const { path } = await this.imageService.processUpload(upload);
    return await this.repository.insert({ name, imageUrl: path });
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
}
