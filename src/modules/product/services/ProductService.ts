import { getRepository, Repository } from 'typeorm';

import { Product } from '../entities';

export class ProductService {
  private _productepository: Repository<Product> = getRepository(Product);

  async getAllProducts(): Promise<Product[]> {
    return this._productepository.find();
  }

  async createProduct(name: string, description: string, price: number, brandId: string, categoryId: string): Promise<Product> {
    const productToCreate = this._productepository.create({
      name,
      description,
      price,
      brand: {
        id: brandId,
      },
      category: {
        id: categoryId,
      },
    });
    return await this._productepository.save(productToCreate);
  }
}
