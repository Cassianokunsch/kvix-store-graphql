import { getRepository, Repository } from 'typeorm';

import { Product } from '../entities';
import { BrandService, CategoryService } from './';

export class ProductService {
  private _productepository: Repository<Product> = getRepository(Product);
  private _brandService: BrandService = new BrandService();
  private _categoryService: CategoryService = new CategoryService();

  async products(): Promise<Product[]> {
    return await getRepository(Product).find();
  }

  async createProduct(product: Product): Promise<Product> {
    this._brandService.findById('1');
    this._categoryService.findById('1');

    const productToCreate = this._productepository.create({
      ...input,
      brand: {
        id: input.brandId,
      },
      category: {
        id: input.categoryId,
      },
    });
    return await this._productepository.save(productToCreate);
  }
}
