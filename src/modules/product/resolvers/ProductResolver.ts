import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Product, Brand, Category } from '../entities';
import { CreateProductInput } from '../schemas/inputs';
import { ProductType } from '../schemas/types';
import { ProductService } from '../services/ProductService';

@Resolver(ProductType)
export class ProductResolver {
  private _productService: ProductService = new ProductService();

  @Query(() => [ProductType], { nullable: true })
  async products(): Promise<ProductType[]> {
    return await getRepository(ProductType).find();
  }

  @Mutation(() => ProductType)
  async createProduct(@Arg('CreateProductInput') input: CreateProductInput): Promise<ProductType> {
    const { name, description, price, brand, category } = input;

    const product = new Product(name, description, price);
    product.brand = new Brand();
    product.brand.id = brand.id;

    product.category = new Category();
    product.category.id = category.id;

    return await this._productService.createProduct(product);
  }
}
