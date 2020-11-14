import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../../common/base.repository';
import { Brand } from '../database/entities/brand.entity';

export class BrandRepository extends BaseRepository<Brand> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager, Brand);
  }
}
