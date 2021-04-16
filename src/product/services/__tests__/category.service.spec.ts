import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryService } from '../category.service';
import { ImageService } from '../image.service';
import { categoryMock, fileUploadMock, processUploadMockReturn, lstOfCategoriesMock, id } from './mock';

describe('category.service', () => {
  let service: CategoryService;
  let imageService: ImageService;
  let repository: CategoryRepository;

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
          findById: jest.fn().mockReturnValue(categoryMock),
          update: jest.fn().mockReturnValue(categoryMock),
        }),
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(imageService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('category.service.create', () => {
    it('should be a Category', async () => {
      expect(await service.create({ name: 'Bolsas', image: fileUploadMock })).toBe(categoryMock);
      expect(imageService.processUpload).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledTimes(1);
    });
  });

  describe('category.service.findAll', () => {
    it('should be return an array of categories', async () => {
      expect(await service.findAll()).toBe(lstOfCategoriesMock);
      expect(repository.findAll).toBeCalledTimes(1);
    });
  });

  describe('category.service.findById', () => {
    it('should be return a category', async () => {
      expect(await service.findById(id)).toBe(categoryMock);
      expect(repository.findById).toBeCalledTimes(1);
    });
  });

  describe('category.service.update', () => {
    it('should be update a category', async () => {
      expect(await service.update({ id, name: 'Kvix', image: fileUploadMock })).toBe(categoryMock);
      expect(repository.update).toBeCalledTimes(1);
    });
  });
});
