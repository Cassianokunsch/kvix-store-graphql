import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductImages } from './entities/productImages.entity';
import { BrandResolver } from './resolvers/brand/brand.resolver';
import { CategoryResolver } from './resolvers/category/category.resolver';
import { ProductResolver } from './resolvers/product/product.resolver';
import { BrandRepository } from './services/brand/brand.repository';
import { BrandService } from './services/brand/brand.service';
import { CategoryRepository } from './services/category/category.repository';
import { CategoryService } from './services/category/category.service';
import { ImageRepository } from './services/image/image.repository';
import { ImageService } from './services/image/image.service';
import { ProductRepository } from './services/product/product.repository';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, ProductImages])],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepository,
    BrandResolver,
    BrandService,
    BrandRepository,
    ImageService,
    ImageRepository,
    CategoryResolver,
    CategoryService,
    CategoryRepository,
  ],
})
export class ProductModule {}
