import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';

import { BaseRepository } from '../../../common/base.repository';
import { ProductImages } from '../../entities/productImages.entity';

export class ImageRepository extends BaseRepository<ProductImages> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager, ProductImages);
  }
}
