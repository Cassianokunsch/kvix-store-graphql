import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { BrandService } from '../../services/brand.service';
import { BrandResolver } from '../brand.resolver';
import { lstOfBrandsMock, brandMock } from './mock';

describe('brand.resolver', () => {
  let resolver: BrandResolver;
  let service: BrandService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BrandResolver,
        mockProvider(BrandService, {
          findAll: jest.fn().mockReturnValue(lstOfBrandsMock),
          create: jest.fn().mockReturnValue(brandMock),
          disable: jest.fn(),
        }),
      ],
    }).compile();
    resolver = module.get<BrandResolver>(BrandResolver);
    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('brand.resolver.brands', () => {
    it('should be return an array of brands', async () => {
      expect(await resolver.brands()).toBe(lstOfBrandsMock);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('brand.resolver.createBrand', () => {
    it('should be return an brand created', async () => {
      expect(await resolver.createBrand({ name: 'Kvix', image: null })).toBe(brandMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('brand.resolver.disableBrand', () => {
    it('should be disable an brand', async () => {
      await resolver.disableBrand('9eccc33a-9b2d-417b-87f1-aadbe884c5c4');
      expect(service.disable).toHaveBeenCalledTimes(1);
    });
  });
});
