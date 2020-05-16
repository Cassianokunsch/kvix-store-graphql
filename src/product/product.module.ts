import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductResolver } from './resolvers/product/product.resolver';

import { BrandResolver } from './resolvers/brand/brand.resolver';

import { ImageService } from './services/image/image.service';

import { ProductImages } from './entities/productImages.entity';
import { CategoryResolver } from './resolvers/category/category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, ProductImages])],
  providers: [ProductResolver, BrandResolver, ImageService, CategoryResolver],
})
export class ProductModule {}
