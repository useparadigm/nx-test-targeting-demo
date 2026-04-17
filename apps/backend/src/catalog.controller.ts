import { ProductService } from '@org/marketplace';

export class CatalogController {
  private productService = new ProductService();

  getCatalog() {
    return this.productService.getProducts().map((p) => ({
      ...p,
      displayPrice: this.productService.getDisplayPrice(p),
    }));
  }
}
