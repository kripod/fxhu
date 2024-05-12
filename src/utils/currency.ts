export const QUOTE_CURRENCY = "HUF";

export function isCurrency(value: string) {
  return /^[A-Z]{3}$/.test(value);
}

export function currencyPairSymbol(
  baseCurrency: string,
  quoteCurrency: string,
) {
  return baseCurrency + quoteCurrency;
}
