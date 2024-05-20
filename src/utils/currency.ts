const CURRENCY_LENGTH = 3;

export const QUOTE_CURRENCY = "HUF";
export const POPULAR_BASE_CURRENCIES = ["EUR", "USD"];

export function isCurrency(value: string) {
  return /^[A-Z]{3}$/.test(value);
}

export function countryFromCurrency(currency: string) {
  return currency.slice(0, 2);
}

export function currencyPairSymbol(
  baseCurrency: string,
  quoteCurrency: string,
) {
  return baseCurrency + quoteCurrency;
}

export function baseCurrencyFromSymbol(symbol: string) {
  return symbol.slice(0, CURRENCY_LENGTH);
}
