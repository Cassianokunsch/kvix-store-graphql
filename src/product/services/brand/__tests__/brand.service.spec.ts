import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../../common/utils-test';
import { ImageService } from '../../image/image.service';
import { BrandRepository } from '../brand.repository';
import { BrandService } from '../brand.service';
import { brandMock, lstOfBrandsMock, processUploadMockReturn } from './brand.repository.mock';

describe('brand.service', () => {
  let service: BrandService;
  let imageService: ImageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BrandService,
        mockProvider(ImageService, { processUpload: jest.fn().mockReturnValue(processUploadMockReturn) }),
        mockProvider(BrandRepository, { insert: jest.fn().mockReturnValue(brandMock), findAll: jest.fn().mockReturnValue(lstOfBrandsMock) }),
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(imageService).toBeDefined();
  });

  describe('brand.service.createOne', () => {
    it('should be a brand', async () => {
      expect(await service.create('Kvix', null)).toBe(brandMock);
      expect(imageService.processUpload).toBeCalledTimes(1);
    });
  });

  describe('brand.service.findAll', () => {
    it('should be return an array of brands', async () => {
      expect(await service.findAll()).toBe(lstOfBrandsMock);
    });
  });
});
