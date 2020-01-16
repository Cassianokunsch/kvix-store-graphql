import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Brand } from '../schemas/types';

@Resolver(Brand)
export class BrandResolver {
  @Query(() => [Brand], { nullable: true })
  async brands(): Promise<Brand[]> {
    return await getRepository(Brand).find();
  }

  @Mutation(() => Brand)
  async createBrand(@Arg('name') name: string): Promise<Brand> {
    const brandToCreate = getRepository(Brand).create({ name });
    return await getRepository(Brand).save(brandToCreate);
  }
}
