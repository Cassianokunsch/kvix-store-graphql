import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

import { Brand } from '../database/entities/brand.entity';
import { CreateBrandInput, UpdateBrandInput } from '../inputs/brand.input';
import { BrandRepository } from '../repositories/brand.repository';
import { ImageService } from './image.service';

@Injectable()
export class BrandService {
  constructor(private readonly repository: BrandRepository, private readonly imageService: ImageService) {}

  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    const { path } = await this.imageService.processUpload(createBrandInput.image);
    return await this.repository.insert({ name: createBrandInput.name, imageUrl: path });
  }

  async disable(id: string): Promise<void> {
    await this.repository.fakeDelete({ id });
  }

  async findAll(options?: FindManyOptions<Brand>): Promise<Brand[]> {
    return await this.repository.findAll(options);
  }

  async findById(id: string): Promise<Brand> {
    return await this.repository.findById(id);
  }

  async update(updateBrand: UpdateBrandInput): Promise<Brand> {
    return await this.repository.update(updateBrand.id, { ...updateBrand });
  }
}
