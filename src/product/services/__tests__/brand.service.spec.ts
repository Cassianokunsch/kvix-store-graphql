import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { BrandRepository } from '../../repositories/brand.repository';
import { BrandService } from '../brand.service';
import { ImageService } from '../image.service';
import { brandMock, lstOfBrandsMock, processUploadMockReturn, image, id } from './mock';

describe('brand.service', () => {
  let service: BrandService;
  let imageService: ImageService;
  let repository: BrandRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BrandService,
        mockProvider(ImageService, { processUpload: jest.fn().mockReturnValue(processUploadMockReturn) }),
        mockProvider(BrandRepository, {
          insert: jest.fn().mockReturnValue(brandMock),
          findAll: jest.fn().mockReturnValue(lstOfBrandsMock),
          findById: jest.fn().mockReturnValue(brandMock),
          update: jest.fn().mockReturnValue(brandMock),
        }),
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    service = module.get<BrandService>(BrandService);
    repository = module.get<BrandRepository>(BrandRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(imageService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('brand.service.create', () => {
    it('should be create a brand', async () => {
      expect(await service.create({ name: 'Kvix', image })).toBe(brandMock);
      expect(imageService.processUpload).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledTimes(1);
    });
  });

  // describe('brand.service.disable', () => {
  //   it('should be return an array of brands', async () => {
  //     expect(await service.disable(id));
  //     expect(service.disable).toBeCalledTimes(1);
  //   });
  // });

  describe('brand.service.findAll', () => {
    it('should be return an array of brands', async () => {
      expect(await service.findAll()).toBe(lstOfBrandsMock);
      expect(repository.findAll).toBeCalledTimes(1);
    });
  });

  describe('brand.service.findById', () => {
    it('should be return a brand', async () => {
      expect(await service.findById(id)).toBe(brandMock);
      expect(repository.findById).toBeCalledTimes(1);
    });
  });

  describe('brand.service.update', () => {
    it('should be update a brand', async () => {
      expect(await service.update({ id, name: 'Kvix', image })).toBe(brandMock);
      expect(repository.update).toBeCalledTimes(1);
    });
  });
});
