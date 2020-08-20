import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../../common/utils-test';
import { ImageService } from '../../image/image.service';
import { CategoryRepository } from '../category.repository';
import { CategoryService } from '../category.service';
import { categoryMock, fileUploadMock, processUploadMockReturn, lstOfCategoriesMock } from './category.repository.mock';

describe('Category.service', () => {
  let service: CategoryService;
  let imageService: ImageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        mockProvider(ImageService, {
          processUpload: jest.fn().mockReturnValue(processUploadMockReturn),
        }),
        mockProvider(CategoryRepository, {
          insert: jest.fn().mockReturnValue(categoryMock),
          findAll: jest.fn().mockReturnValue(lstOfCategoriesMock),
        }),
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(imageService).toBeDefined();
  });

  describe('category.service.create', () => {
    it('should be a Category', async () => {
      expect(await service.create('Bolsas', fileUploadMock)).toBe(categoryMock);
      expect(imageService.processUpload).toBeCalledTimes(1);
    });
  });

  describe('category.service.findAll', () => {
    it('should be return an array of categories', async () => {
      expect(await service.findAll()).toBe(lstOfCategoriesMock);
    });
  });
});
