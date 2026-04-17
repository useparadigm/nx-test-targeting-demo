import { formatPrice } from './pricing';

describe('formatPrice', () => {
  it('formats cents to dollars', () => {
    expect(formatPrice(1999)).toBe('$19.99');
  });

  it('supports custom currency', () => {
    expect(formatPrice(500, 'EUR')).toBe('\u20AC5.00');
  });
});
