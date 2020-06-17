const image = { filename: 'bolsa.png', mimetype: 'mimetype', encoding: 'encoding', createReadStream: null };

export const createProductDtoMock = {
  name: 'Bolsa',
  description: 'Uma bolsa linda',
  price: 100.0,
  brandId: '9eccc33a-9b2d-417b-87f1-aadbe884c5c4',
  categoryId: '9eccc33a-9b2d-417b-87f1-aadbe884c5c4',
  images: [image],
};

export const productMock = {
  name: 'Bolsa',
  description: 'Uma bolsa linda',
  price: 100.0,
  brand: {
    id: '',
    description: '',
  },
  category: {
    id: '',
    description: '',
  },
  images: [],
};

export const lstOfProductMock = [productMock];
