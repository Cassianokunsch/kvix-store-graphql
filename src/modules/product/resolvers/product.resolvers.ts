import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Product } from '../entities/Product';
import { CreateProductInput } from './inputs/product.inputs';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product], { nullable: true })
  async products(): Promise<Product[]> {
    return await getRepository(Product).find();
  }

  @Mutation(() => Product)
  async createProduct(@Arg('CreateProductInput') input: CreateProductInput): Promise<Product> {
    const productToCreate = getRepository(Product).create({
      ...input,
      brand: {
        id: input.brandId,
      },
      category: {
        id: input.categoryId,
      },
    });
    return await getRepository(Product).save(productToCreate);
  }
}
