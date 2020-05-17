import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Brand } from '../../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from '../../services/image.service';
import { CreateBrand } from '../../dtos/brand.input';

@Resolver(Brand)
export class BrandResolver {
  constructor(
    @InjectRepository(Brand)
    private readonly repository: Repository<Brand>,
    private readonly imageService: ImageService,
  ) {}

  @Query(() => [Brand])
  async brands(): Promise<Brand[]> {
    return await this.repository.find();
  }

  @Mutation(() => Brand)
  async createBrand(@Args() { name, image }: CreateBrand): Promise<Brand> {
    const { path } = await this.imageService.processUpload(await image);
    return await this.repository.save({
      name,
      imageUrl: path,
    });
  }
}
