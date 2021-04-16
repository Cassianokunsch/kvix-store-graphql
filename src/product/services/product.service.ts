import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';

import { PaginationArgs } from '../../common/pagination.args';
import { Product } from '../database/entities/product.entity';
import { CreateProductnput, UpdateProductInput } from '../inputs/product.input';
import { ProductRepository } from '../repositories/product.repository';
import { ImageService } from './image.service';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository, private readonly imageService: ImageService) {}

  async create(createProduct: CreateProductnput): Promise<Product> {
    const { name, description, price, categoryId, brandId, images } = createProduct;

    return await this.repository.runInTransaction<Product>(async () => {
      const product = await this.repository.insert({ name, description, price, category: { id: categoryId }, brand: { id: brandId } });
      product.images = await this.imageService.createMany(images, product.id);

      return product;
    });
  }

  async findAll(filter: string, paginationArgs: PaginationArgs): Promise<Product[]> {
    let where;

    if (filter) {
      const filterLowed = filter.toLowerCase();
      where = [{ name: Like(`%${filterLowed}%`) }, { description: Like(`%${filterLowed}%`) }];
    }

    return await this.repository.findAll({
      where,
      ...paginationArgs,
    });
  }

  async update(updateProduct: UpdateProductInput): Promise<Product> {
    return await this.repository.update(updateProduct.id, { ...updateProduct });
  }

  async disable(id: string): Promise<void> {
    await this.repository.fakeDelete({ id });
  }

  async findById(id: string): Promise<Product> {
    return await this.repository.findById(id);
  }
}
