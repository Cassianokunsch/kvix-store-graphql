import { Test } from '@nestjs/testing';

import { mockProvider } from '../../../../common/utils-test';
import { BrandService } from '../../../services/brand/brand.service';
import { CategoryService } from '../../../services/category/category.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductResolver } from '../product.resolver';
import { lstOfProductMock, productMock, createProductDtoMock } from './product.resolver.mock';

describe('product.resolver', () => {
  let resolver: ProductResolver;
  let service: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductResolver,
        mockProvider(ProductService, {
          findAll: jest.fn().mockReturnValue(lstOfProductMock),
          create: jest.fn().mockReturnValue(productMock),
          disable: jest.fn(),
          findProductImages: jest.fn(),
        }),
        mockProvider(BrandService),
        mockProvider(CategoryService),
        //mockProvider(ImageService, { find: jest.fn().mockReturnValue(lstOfProducts), save: jest.fn().mockReturnValue(product) }),
      ],
    }).compile();
    resolver = module.get<ProductResolver>(ProductResolver);
    service = module.get<ProductService>(ProductService);
  });

  describe('product.resolver.findAll', () => {
    it('should be return an list of products', async () => {
      expect(await resolver.products()).toBe(lstOfProductMock);
      expect(service.findAll).toBeCalledTimes(1);
    });
  });

  describe('product.resolver.createProduct', () => {
    it('should be return an Product created', async () => {
      expect(await resolver.createProduct(createProductDtoMock)).toBe(productMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('product.resolver.disableProduct', () => {
    it('should be disable an product', async () => {
      await resolver.disableProduct('9eccc33a-9b2d-417b-87f1-aadbe884c5c4');
      expect(service.disable).toHaveBeenCalledTimes(1);
    });
  });

  // describe('product.resolver.images', () => {
  //   it('should be return a list of product images', async () => {
  //     const product = new Product();
  //     product.id = '9eccc33a-9b2d-417b-87f1-aadbe884c5c4';
  //     expect(await resolver.images(product)).toBe(productMock);
  //     expect(service.create).toHaveBeenCalledTimes(1);
  //   });
  // });
});
