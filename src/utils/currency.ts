import { SITE_LOCALE } from "./intl";

const CURRENCY_LENGTH = 3;

export const QUOTE_CURRENCY = "HUF";
export const POPULAR_BASE_CURRENCIES = ["EUR", "USD"];

export function isCurrency(value: string) {
  return /^[A-Z]{3}$/.test(value);
}

const currencyNames = new Intl.DisplayNames(SITE_LOCALE, {
  type: "currency",
  fallback: "none",
});

export function currencyName(currency: string) {
  return currencyNames.of(currency);
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
