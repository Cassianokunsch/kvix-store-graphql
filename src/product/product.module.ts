import { Brand } from './data/entities/brand.entity';
import { BrandResolver } from './resolvers/brand.resolver';
import { BrandService } from './services/brand.service';
import { Category } from './data/entities/category.entity';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';
import { Module } from '@nestjs/common';
import { Product } from './data/entities/product.entity';
import { ProductResolver } from '../product/resolvers/product.resolver';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './data/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, Image])],
  providers: [ProductResolver, ProductService, BrandResolver, BrandService, CategoryService, CategoryResolver],
})
export class ProductModule {}
