import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { BrandType } from '../schemas/types';
import { BrandService } from '../services';

@Resolver(BrandType)
export class BrandResolver {
  private _brandService: BrandService = new BrandService();

  @Query(() => [BrandType], { nullable: true })
  async brands(): Promise<BrandType[]> {
    return (await this._brandService.getAllBrands()) as BrandType[];
  }

  @Mutation(() => BrandType, { nullable: true })
  async createBrand(@Arg('name') name: string): Promise<BrandType> {
    return (await this._brandService.createBrand(name)) as BrandType;
  }
}
