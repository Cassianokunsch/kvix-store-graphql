import { Test, TestingModule } from '@nestjs/testing';

import { Brand } from '../../data/entities/Brand.entity';
import { BrandService } from '../brand.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lstOfBrand, brandMock } from './data.mock';

describe('Brand Service', () => {
  let service: BrandService;
  let spyRepository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: getRepositoryToken(Brand),
          useValue: { find: jest.fn().mockReturnValue(lstOfBrand), save: jest.fn().mockReturnValue(brandMock) },
        },
      ],
    }).compile();

    spyRepository = module.get(getRepositoryToken(Brand));
    service = module.get<BrandService>(BrandService);
  });

  describe('findAll', () => {
    it('should return an array of Brands', async () => {
      expect(await service.findAll()).toBe(lstOfBrand);
      expect(spyRepository.find).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return an array of Brands', async () => {
      expect(await service.create(brandMock)).toBe(brandMock);
      expect(spyRepository.save).toBeCalledTimes(1);
    });
  });
});
