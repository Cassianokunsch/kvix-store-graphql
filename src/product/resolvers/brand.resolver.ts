import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Brand } from '../database/entities/brand.entity';
import { CreateBrandInput, UpdateBrandInput } from '../inputs/brand.input';
import { BrandService } from '../services/brand.service';

@Resolver(Brand)
export class BrandResolver {
  constructor(private readonly service: BrandService) {}

  @Query(() => [Brand])
  async brands(): Promise<Brand[]> {
    return await this.service.findAll();
  }

  @Query(() => Brand)
  async brand(@Args('id') id: string): Promise<Brand> {
    return await this.service.findById(id);
  }

  @Mutation(() => Brand)
  async createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput): Promise<Brand> {
    return await this.service.create(createBrandInput);
  }

  @Mutation(() => Brand)
  async updateBrand(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput): Promise<Brand> {
    return await this.service.update(updateBrandInput);
  }

  @Mutation(() => Brand)
  async disableBrand(@Args('id') id: string): Promise<void> {
    await this.service.disable(id);
  }
}
