import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Product } from '../../entities/product.entity';

import { CreateProduct } from '../../dtos/product.input';
import { ImageService } from '../../services/image/image.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(Product)
export class ProductResolver {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly imageService: ImageService,
  ) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.repository.find();
  }

  @Mutation(() => Product)
  async createProduct(@Args('create') createProduct: CreateProduct): Promise<Product> {
    //const { path } = await this.imageService.processUpload(file);
    return await this.repository.save(new Product());
  }
}
