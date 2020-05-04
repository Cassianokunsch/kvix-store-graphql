import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandService } from '../services/brand.service';
import { Brand } from '../data/entities/brand.entity';

@Resolver(Brand)
export class BrandResolver {
  constructor(private readonly _service: BrandService) {}

  @Query(() => [Brand], { nullable: true })
  async brands(): Promise<Brand[]> {
    return await this._service.findAll();
  }

  @Mutation(() => Brand, { nullable: true })
  async createBrand(@Args({ name: 'name', type: () => String }) name: string): Promise<Brand> {
    const brand = new Brand();
    brand.name = name;
    return await this._service.create(brand);
  }
}
