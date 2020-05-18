import { Query, Resolver, Mutation, Args, ResolveField, Root, Parent } from '@nestjs/graphql';
import { Product } from '../../entities/product.entity';

import { CreateProduct } from '../../dtos/product.input';
import { ImageService } from '../../services/image.service';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { ProductImages } from '../../entities/productImages.entity';
import { Brand } from '../../entities/brand.entity';
import { Category } from '../../entities/category.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Resolver(Product)
export class ProductResolver {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(ProductImages)
    private readonly productImagesRepository: Repository<ProductImages>,
    private readonly imageService: ImageService,
  ) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.repository.find();
  }

  @Mutation(() => Product)
  async createProduct(@Args('create') createProduct: CreateProduct): Promise<Product> {
    const { name, price, description, image, categoryId, brandId } = createProduct;
    const imageSaved = await this.imageService.processUpload(await image);

    return await this.connection.transaction(async manager => {
      const productImagesRepository = manager.getRepository(ProductImages);
      const productRepository = manager.getRepository(Product);
      const product = await productRepository.save({ name, price, description, brand: { id: brandId }, category: { id: categoryId } });
      await productImagesRepository.save({ ...imageSaved, product });
      return product;
    });
  }

  @ResolveField(() => [ProductImages])
  async images(@Parent() { id }: Product): Promise<ProductImages[]> {
    return await this.productImagesRepository.find({ where: { product: { id } } });
  }

  // @ResolveField()
  // async brand(@Parent() { id }: Product): Promise<Brand> {
  //   const { brand } = await this.brandRepository.findOne({ where: {} });
  //   return brand;
  // }

  // @ResolveField(() => [Category])
  // async category(): Promise<Category> {
  //   return null;
  // }
}
