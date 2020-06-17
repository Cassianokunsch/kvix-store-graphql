import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../../common/utils-test';
import { ImageService } from '../../image/image.service';
import { BrandRepository } from '../brand.repository';
import { BrandService } from '../brand.service';
import { brandMock } from './brand.repository.mock';

describe('brand.service', () => {
  let service: BrandService;
  let imageService: ImageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BrandService,
        mockProvider(ImageService, { processUpload: jest.fn().mockReturnValue({ path: 'path' }) }),
        mockProvider(BrandRepository, { insert: jest.fn().mockReturnValue(brandMock) }),
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('brand.service.createOne', () => {
    it('should be a brand', async () => {
      expect(await service.create('Kvix', null)).toBe(brandMock);
      expect(imageService.processUpload).toBeCalledTimes(1);
    });
  });
});
