export function formatPrice(cents: number, currency = "USD"): string {
  const dollars = (cents / 100).toFixed(2);
  return `${currency} ${dollars}`;
}
