import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Brand } from '../data/entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly _repository: Repository<Brand>,
  ) {
    super(_repository);
  }
}
