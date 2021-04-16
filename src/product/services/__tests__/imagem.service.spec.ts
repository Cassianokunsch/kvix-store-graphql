import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { ImageRepository } from '../../repositories/image.repository';
import { ImageService } from '../image.service';
import { lstOfProductImagesMock, id } from './mock';

describe('image.service', () => {
  let service: ImageService;
  let repository: ImageRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ImageService,
        mockProvider(ImageRepository, {
          findAll: jest.fn().mockReturnValue(lstOfProductImagesMock),
          delete: jest.fn().mockReturnValue(true),
        }),
      ],
    }).compile();

    repository = module.get<ImageRepository>(ImageRepository);
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  // describe('image.service.create', () => {
  //   it('should be a ProductImage', async () => {
  //     expect(await service.create(fileUploadMock, id)).toBe(productImagesMock);
  //     expect(service.create).toBeCalledTimes(1);
  //   });
  // });

  // describe('image.service.createMany', () => {
  //   it('should be return an array of categories', async () => {
  //     expect(await service.createMany([fileUploadMock], id)).toBe(productImagesMock);
  //     expect(service.create).toBeCalledTimes(1);
  //   });
  // });

  describe('image.service.findAll', () => {
    it('should be return a list of ProductImages', async () => {
      expect(await service.findAll()).toBe(lstOfProductImagesMock);
      expect(repository.findAll).toBeCalledTimes(1);
    });
  });

  describe('image.service.delete', () => {
    it('should be return a list of ProductImages', async () => {
      expect(await service.delete(id)).toBe(true);
      expect(repository.delete).toBeCalledTimes(1);
    });
  });
});
