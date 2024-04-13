export function isCurrency(value: string) {
  return /^[A-Z]{3}$/.test(value);
}

export function currencyPair(base: string, quote: string) {
  return base + quote;
}
