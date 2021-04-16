import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../../common/base.repository';
import { Product } from '../database/entities/product.entity';

export class ProductRepository extends BaseRepository<Product> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager, Product);
  }
}
