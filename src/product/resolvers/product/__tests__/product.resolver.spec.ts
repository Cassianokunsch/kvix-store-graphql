import { ProductResolver } from '../product.resolver';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImageService } from '../../../services/image.service';

const lstOfProducts = [];
const product = {};

describe('product.resolver', () => {
  let resolver: ProductResolver;
  let spyRepository: Repository<Product>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductResolver,
        ImageService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockReturnValue(lstOfProducts),
            save: jest.fn().mockReturnValue(product),
          },
        },
      ],
    }).compile();
    resolver = module.get<ProductResolver>(ProductResolver);
    spyRepository = module.get(getRepositoryToken(Product));
  });

  describe('product.resolver.find', () => {
    it('should be return an list of products', async () => {
      await resolver.products();
      expect(spyRepository.find).toBeCalledTimes(1);
    });
  });
});
