import { Query, Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { Brand } from '../../entities/brand.entity';
import { Category } from '../../entities/category.entity';
import { Product } from '../../entities/product.entity';
import { ProductImages } from '../../entities/productImages.entity';
import { BrandService } from '../../services/brand/brand.service';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';

@Resolver(Product)
export class ProductResolver {
  constructor(
    private readonly service: ProductService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.service.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('create') createProductDto: CreateProductDto): Promise<Product> {
    return await this.service.create(createProductDto);
  }

  @Mutation(() => Product)
  async disableProduct(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }

  @ResolveField(() => [ProductImages])
  async images(@Parent() { id }: Product): Promise<ProductImages[]> {
    return await this.service.findProductImages(id);
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
