import { CatalogController } from './catalog.controller';

describe('CatalogController', () => {
  it('returns catalog with display prices', () => {
    const controller = new CatalogController();
    const catalog = controller.getCatalog();

    expect(catalog).toHaveLength(2);
    expect(catalog[0].displayPrice).toContain('$');
  });
});
