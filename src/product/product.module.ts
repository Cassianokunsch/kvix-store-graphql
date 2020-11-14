import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './database/entities/brand.entity';
import { Category } from './database/entities/category.entity';
import { Product } from './database/entities/product.entity';
import { ProductImages } from './database/entities/productImages.entity';
import { BrandRepository } from './repositories/brand.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ImageRepository } from './repositories/image.repository';
import { ProductRepository } from './repositories/product.repository';
import { BrandResolver } from './resolvers/brand.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { ImageResolver } from './resolvers/image.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { ImageService } from './services/image.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, ProductImages])],
  providers: [
    ProductResolver,
    ImageResolver,
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
