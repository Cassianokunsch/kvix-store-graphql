import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../common/utils-test';
import { BrandService } from '../../services/brand.service';
import { CategoryService } from '../../services/category.service';
import { ImageService } from '../../services/image.service';
import { ProductService } from '../../services/product.service';
import { ProductResolver } from '../product.resolver';
import { lstOfProductMock, productMock, createProductnputMock, id, brandMock, categoryMock, lstOfImagesMock } from './mock';

describe('product.resolver', () => {
  let resolver: ProductResolver;
  let service: ProductService;
  let imageService: ImageService;
  let categoryService: CategoryService;
  let brandService: BrandService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductResolver,
        mockProvider(ProductService, {
          findAll: jest.fn().mockReturnValue(lstOfProductMock),
          findById: jest.fn().mockReturnValue(productMock),
          create: jest.fn().mockReturnValue(productMock),
          disable: jest.fn(),
        }),
        mockProvider(BrandService, {
          findById: jest.fn().mockReturnValue(brandMock),
        }),
        mockProvider(ImageService, {
          findAll: jest.fn().mockReturnValue(lstOfImagesMock),
        }),
        mockProvider(CategoryService, {
          findById: jest.fn().mockReturnValue(categoryMock),
        }),
        //mockProvider(ImageService, { find: jest.fn().mockReturnValue(lstOfProducts), save: jest.fn().mockReturnValue(product) }),
      ],
    }).compile();
    resolver = module.get<ProductResolver>(ProductResolver);
    service = module.get<ProductService>(ProductService);
    imageService = module.get<ImageService>(ImageService);
    categoryService = module.get<CategoryService>(CategoryService);
    brandService = module.get<BrandService>(BrandService);
  });

  describe('product.resolver.products', () => {
    it('should be return an list of products', async () => {
      expect(await resolver.products('', { skip: 0, take: 0 })).toBe(lstOfProductMock);
      expect(service.findAll).toBeCalledTimes(1);
    });
  });

  describe('product.resolver.product', () => {
    it('should be return a product', async () => {
      expect(await resolver.product(id)).toBe(productMock);
      expect(service.findById).toBeCalledTimes(1);
    });
  });

  describe('product.resolver.createProduct', () => {
    it('should be return an Product created', async () => {
      expect(await resolver.createProduct(createProductnputMock)).toBe(productMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('product.resolver.disableProduct', () => {
    it('should be disable an product', async () => {
      await resolver.disableProduct(id);
      expect(service.disable).toHaveBeenCalledTimes(1);
    });
  });

  describe('product.resolver.images', () => {
    it('should be return a list of product images', async () => {
      expect(await resolver.images(productMock)).toBe(lstOfImagesMock);
      expect(imageService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('product.resolver.brand', () => {
    it('should be return a brand', async () => {
      expect(await resolver.brand(productMock)).toBe(brandMock);
      expect(brandService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('product.resolver.category', () => {
    it('should be return a list of product images', async () => {
      expect(await resolver.category(productMock)).toBe(categoryMock);
      expect(categoryService.findById).toHaveBeenCalledTimes(1);
    });
  });
});
