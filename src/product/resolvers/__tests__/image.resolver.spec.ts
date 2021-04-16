import { Test, TestingModule } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { ImageService } from '../../services/image.service';
import { ImageResolver } from '../image.resolver';
import { id, image, imageMock } from './mock';

describe('image.resolver', () => {
  let resolver: ImageResolver;
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageResolver,
        mockProvider(ImageService, {
          create: jest.fn().mockReturnValue(imageMock),
          delete: jest.fn().mockResolvedValue(true),
        }),
      ],
    }).compile();

    resolver = module.get<ImageResolver>(ImageResolver);
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('image.resolver.deleteImage', () => {
    it('delete a image', async () => {
      expect(await resolver.deleteImage(id));
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('image.resolver.createImage', () => {
    it('delete a image', async () => {
      expect(await resolver.createImage({ productId: id, image })).toBe(imageMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });
});
