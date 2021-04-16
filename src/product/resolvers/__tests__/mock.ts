import { Brand } from '../../database/entities/brand.entity';
import { Category } from '../../database/entities/category.entity';
import { Product } from '../../database/entities/product.entity';
import { ProductImages } from '../../database/entities/productImages.entity';

export const image = { filename: 'bolsa.png', mimetype: 'mimetype', encoding: 'encoding', createReadStream: null };

export const id = '9eccc33a-9b2d-417b-87f1-aadbe884c5c4';

export const createProductnputMock = {
  name: 'Bolsa',
  description: 'Uma bolsa linda',
  price: 100.0,
  brandId: '9eccc33a-9b2d-417b-87f1-aadbe884c5c4',
  categoryId: '9eccc33a-9b2d-417b-87f1-aadbe884c5c4',
  images: [image],
};

export const imageMock = new ProductImages();
imageMock.encoding = 'encoding';
imageMock.filename = 'bolsa.png';
imageMock.mimetype = 'mimetype';
imageMock.path = '';

export const brandMock = new Brand();
brandMock.id = id;
brandMock.imageUrl = '';
brandMock.name = '';

export const categoryMock = new Category();
categoryMock.id = id;
categoryMock.imageUrl = '';
categoryMock.name = '';

export const productMock = new Product();
productMock.id = id;
productMock.name = 'Bolsa';
productMock.description = 'Uma bolsa linda';
productMock.price = 100.0;
productMock.brand = brandMock;
productMock.category = categoryMock;
productMock.images = [];

export const lstOfProductMock = [productMock, productMock, productMock];

export const lstOfCategoriesMock = [categoryMock, categoryMock];

export const lstOfBrandsMock = [brandMock, brandMock];

export const lstOfImagesMock = [imageMock, imageMock];
