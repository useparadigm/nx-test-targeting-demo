import { formatPrice } from './pricing';

describe('formatPrice', () => {
  it('formats cents to dollars', () => {
    expect(formatPrice(1999)).toBe('USD 19.99');
  });

  it('supports custom currency', () => {
    expect(formatPrice(500, 'EUR')).toBe('EUR 5.00');
  });
});
