import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateBrandDto } from '../../dtos/brand/create-brand.dto';
import { Brand } from '../../entities/brand.entity';
import { BrandService } from '../../services/brand/brand.service';

@Resolver(Brand)
export class BrandResolver {
  constructor(private readonly service: BrandService) {}

  @Query(() => [Brand])
  async brands(): Promise<Brand[]> {
    return await this.service.findAll();
  }

  @Mutation(() => Brand)
  async createBrand(@Args() { name, image }: CreateBrandDto): Promise<Brand> {
    return await this.service.create(name, image);
  }

  @Mutation(() => Brand)
  async disableBrand(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }
}
