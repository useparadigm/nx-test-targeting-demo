import { ProductService } from './product.service';

describe('ProductService', () => {
  const service = new ProductService();

  it('formats product price', () => {
    const product = { name: 'Widget', priceCents: 999 };
    expect(service.getDisplayPrice(product)).toBe('USD 9.99');
  });

  it('returns product list', () => {
    const products = service.getProducts();
    expect(products).toHaveLength(2);
  });
});
