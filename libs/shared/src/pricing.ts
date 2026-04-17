const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
};

export function formatPrice(cents: number, currency = "USD"): string {
  const dollars = (cents / 100).toFixed(2);
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${dollars}`;
}
