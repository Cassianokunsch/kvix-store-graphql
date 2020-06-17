import { Injectable } from '@nestjs/common';

import { FileUpload } from 'graphql-upload';
import { FindManyOptions } from 'typeorm';

import { Brand } from '../../entities/brand.entity';
import { ImageService } from '../image/image.service';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {
  constructor(private readonly repository: BrandRepository, private readonly imageService: ImageService) {}

  async create(name: string, upload: FileUpload): Promise<Brand> {
    const { path } = await this.imageService.processUpload(upload);
    return await this.repository.insert({ name, imageUrl: path });
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
}
