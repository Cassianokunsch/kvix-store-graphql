import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { Category } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from '../../services/image.service';
import { FileUpload } from '../../utils';
import { GraphQLUpload } from 'apollo-server-fastify';

@Resolver(Category)
export class CategoryResolver {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly imageService: ImageService,
  ) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.repository.find();
  }

  @Mutation(() => Category)
  async createCategory(@Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload, @Args('name') name: string): Promise<Category> {
    const { path } = await this.imageService.processUpload(image);
    return await this.repository.save({
      name,
      imageUrl: path,
    });
  }
}
