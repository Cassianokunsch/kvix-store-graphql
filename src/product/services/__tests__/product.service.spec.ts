import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { ProductRepository } from '../../repositories/product.repository';
import { ImageService } from '../image.service';
import { ProductService } from '../product.service';
import { brandMock, lstOfBrandsMock } from './mock';

describe('product.service', () => {
  let service: ProductService;
  let repository: ProductRepository;
  let imageService: ImageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        mockProvider(ImageService),
        mockProvider(ProductRepository, {
          insert: jest.fn().mockReturnValue(brandMock),
          findAll: jest.fn().mockReturnValue(lstOfBrandsMock),
          findById: jest.fn().mockReturnValue(brandMock),
          update: jest.fn().mockReturnValue(brandMock),
        }),
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
    imageService = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(imageService).toBeDefined();
  });
});
