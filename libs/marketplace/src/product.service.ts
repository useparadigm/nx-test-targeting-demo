import { formatPrice } from '@org/shared';

export interface Product {
  name: string;
  priceCents: number;
}

export class ProductService {
  getDisplayPrice(product: Product): string {
    return formatPrice(product.priceCents);
  }

  getProducts(): Product[] {
    return [
      { name: "Widget", priceCents: 999 },
      { name: "Gadget", priceCents: 2499 },
    ];
  }
}
