import { Test, TestingModule } from '@nestjs/testing';

import { Product } from '../../data/entities/product.entity';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lstOfProduct } from './data.mock';

describe('Product Service', () => {
  let service: ProductService;
  let spyRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: { find: jest.fn().mockReturnValue(lstOfProduct) },
        },
      ],
    }).compile();

    spyRepository = module.get(getRepositoryToken(Product));
    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      expect(await service.findAll()).toBe(lstOfProduct);
      expect(spyRepository.find).toBeCalledTimes(1);
    });
  });
});
