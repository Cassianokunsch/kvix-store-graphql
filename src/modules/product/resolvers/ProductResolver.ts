import { Resolver, Query, Arg, Mutation } from 'type-graphql';

import { CreateProductInput } from '../schemas/inputs';
import { ProductType } from '../schemas/types';
import { ProductService } from '../services/ProductService';

@Resolver(ProductType)
export class ProductResolver {
  private _productService: ProductService = new ProductService();

  @Query(() => [ProductType], { nullable: true })
  async products(): Promise<ProductType[]> {
    return (await this._productService.getAllProducts()) as ProductType[];
  }

  @Mutation(() => ProductType, { nullable: true })
  async createProduct(@Arg('CreateProductInput') createProductInput: CreateProductInput): Promise<ProductType> {
    const { name, description, price, brandId, categoryId } = createProductInput;
    return (await this._productService.createProduct(name, description, price, brandId, categoryId)) as ProductType;
  }
}
