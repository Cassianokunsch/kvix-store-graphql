import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Category } from '../data/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly _repository: Repository<Category>,
  ) {
    super(_repository);
  }
}
