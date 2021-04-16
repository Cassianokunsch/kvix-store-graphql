import { Query, Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PaginationArgs } from '../../common/pagination.args';
import { Brand } from '../database/entities/brand.entity';
import { Category } from '../database/entities/category.entity';
import { Product } from '../database/entities/product.entity';
import { ProductImages } from '../database/entities/productImages.entity';
import { CreateProductnput, UpdateProductInput } from '../inputs/product.input';
import { BrandService } from '../services/brand.service';
import { CategoryService } from '../services/category.service';
import { ImageService } from '../services/image.service';
import { ProductService } from '../services/product.service';

@Resolver(Product)
export class ProductResolver {
  constructor(
    private readonly service: ProductService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
  ) {}

  @Query(() => [Product])
  async products(@Args('filter', { nullable: true }) filter: string, @Args() paginationArgs: PaginationArgs): Promise<Product[]> {
    return await this.service.findAll(filter, paginationArgs);
  }

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.service.findById(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('createProductnput') createProductnput: CreateProductnput): Promise<Product> {
    return await this.service.create(createProductnput);
  }

  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
    return await this.service.update(updateProductInput);
  }

  @Mutation(() => Product)
  async disableProduct(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }

  @ResolveField(() => [ProductImages])
  async images(@Parent() { id }: Product): Promise<ProductImages[]> {
    return await this.imageService.findAll({ where: { product: { id } } });
  }

  @ResolveField()
  async brand(@Parent() { brandId }: Product): Promise<Brand> {
    return await this.brandService.findById(brandId);
  }

  @ResolveField(() => Category)
  async category(@Parent() { categoryId }: Product): Promise<Category> {
    return await this.categoryService.findById(categoryId);
  }
}
