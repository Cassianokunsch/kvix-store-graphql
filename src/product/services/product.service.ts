import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Product } from '../data/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {
    super(_productRepository);
  }
}
