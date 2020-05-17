import { BrandResolver } from '../brand.resolver';
import { Brand } from '../../../entities/brand.entity';
import { Repository } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImageService } from '../../../services/image.service';

const brand = {
  name: 'Kvix',
  imageUrl: 'some path',
};

const lstOfBrands = [brand, brand];

describe('brand.resolver', () => {
  let resolver: BrandResolver;
  let spyRepository: Repository<Brand>;
  let spyImageService: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandResolver,
        ImageService,
        {
          provide: getRepositoryToken(Brand),
          useValue: {
            find: jest.fn().mockReturnValue(lstOfBrands),
            save: jest.fn().mockReturnValue(brand),
          },
        },
      ],
    }).compile();

    spyRepository = module.get(getRepositoryToken(Brand));
    spyImageService = module.get<ImageService>(ImageService);
    resolver = module.get<BrandResolver>(BrandResolver);
  });

  describe('brand.resolver.brands', () => {
    it('should be return an array of brands', async () => {
      expect(await resolver.brands()).toBe(lstOfBrands);
      expect(spyRepository.find).toBeCalledTimes(1);
    });
  });

  describe('brand.resolver.createBrand', () => {
    it('should be return an brand created', async () => {
      jest
        .spyOn(spyImageService, 'processUpload')
        .mockImplementation(() => Promise.resolve({ filename: 'filename', path: 'some path' }));

      const resp = await resolver.createBrand({ name: 'Kvix', image: null });

      expect(resp.imageUrl).toEqual('some path');
      expect(resp.name).toEqual('Kvix');
      expect(spyRepository.save).toBeCalledTimes(1);
    });
  });
});
