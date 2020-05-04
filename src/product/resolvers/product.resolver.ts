import { Query, Resolver } from '@nestjs/graphql';

import { ProductService } from '../services/product.service';
import { Product } from '../data/entities/product.entity';

@Resolver(Product)
export class ProductResolver {
  constructor(private readonly _service: ProductService) {}

  @Query(() => [Product], { nullable: true })
  async products(): Promise<Product[]> {
    return await this._service.findAll();
  }

  // @Mutation(() => Product, { nullable: true })
  // async createProduct(@Args('CreateProduct') createProduct: CreateProduct): Promise<Product> {
  //   const { name, description, price } = createProduct;
  //   return (await this._service.createProduct(name, description, price, 'brandId', 'categoryId')) as Product;
  // }
}
