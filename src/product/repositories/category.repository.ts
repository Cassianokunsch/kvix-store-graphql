import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../../common/base.repository';
import { Category } from '../database/entities/category.entity';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager, Category);
  }
}
