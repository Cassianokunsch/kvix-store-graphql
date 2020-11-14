import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { CategoryService } from '../../services/category.service';
import { CategoryResolver } from '../category.resolver';
import { lstOfCategoriesMock, categoryMock } from './mock';

describe('category.resolver', () => {
  let resolver: CategoryResolver;
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        mockProvider(CategoryService, {
          findAll: jest.fn().mockReturnValue(lstOfCategoriesMock),
          create: jest.fn().mockReturnValue(categoryMock),
          disable: jest.fn(),
        }),
      ],
    }).compile();
    resolver = module.get<CategoryResolver>(CategoryResolver);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('category.resolver.Categorys', () => {
    it('should be return an array of Categorys', async () => {
      expect(await resolver.categories()).toBe(lstOfCategoriesMock);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('category.resolver.createCategory', () => {
    it('should be return an Category created', async () => {
      expect(await resolver.createCategory({ name: 'Kvix', image: null })).toBe(categoryMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('category.resolver.disableCategory', () => {
    it('should be disable an brand', async () => {
      await resolver.disableCategory('9eccc33a-9b2d-417b-87f1-aadbe884c5c4');
      expect(service.disable).toHaveBeenCalledTimes(1);
    });
  });
});
