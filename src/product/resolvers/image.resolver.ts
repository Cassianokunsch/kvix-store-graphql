import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ProductImages } from '../database/entities/productImages.entity';
import { CreateImageInput } from '../inputs/image.input';
import { ImageService } from '../services/image.service';

@Resolver(ProductImages)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => Boolean)
  async deleteImage(@Args('imageId') imageId: string): Promise<boolean> {
    return await this.imageService.delete(imageId);
  }

  @Mutation(() => ProductImages)
  async createImage(@Args('createImageInput') createImageInput: CreateImageInput): Promise<ProductImages> {
    return await this.imageService.create(createImageInput.image, createImageInput.productId);
  }
}
