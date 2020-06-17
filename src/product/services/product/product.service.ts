import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { Product } from '../../entities/product.entity';
import { ProductImages } from '../../entities/productImages.entity';
import { ImageService } from '../image/image.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository, private readonly imageService: ImageService) {}

  async create(createProduct: CreateProductDto): Promise<Product> {
    const { name, description, price, categoryId, brandId, images } = createProduct;

    return await this.repository.runInTransaction<Product>(async () => {
      const product = await this.repository.insert({ name, description, price, category: { id: categoryId }, brand: { id: brandId } });
      product.images = await this.imageService.createMany(images, product.id);

      return product;
    });
  }

  async findProductImages(productId: string): Promise<ProductImages[]> {
    return await this.imageService.findAll({ where: { product: { id: productId } } });
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async disable(id: string): Promise<void> {
    await this.repository.fakeDelete({ id });
  }
}
