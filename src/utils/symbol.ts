import { z } from "astro/zod";

const COUNTRY_LENGTH = 2;
const CURRENCY_LENGTH = 3;

export const CurrencySchema = z
  .string()
  .regex(/^[A-Z]+$/)
  .refine((input) => input.length === CURRENCY_LENGTH);

export const SymbolSchema = z.string().regex(/^[A-Z]+$/);

export const QUOTE_CURRENCY = "HUF";
export const POPULAR_BASE_CURRENCIES = ["EUR", "USD"];

export function countryFromCurrency(currency: string) {
  return currency.slice(0, COUNTRY_LENGTH);
}

export function currencyPairSymbol(
  baseCurrency: string,
  quoteCurrency: string,
) {
  return `${baseCurrency}${quoteCurrency}`;
}

export function baseCurrencyFromSymbol(symbol: string) {
  return symbol.slice(0, CURRENCY_LENGTH);
}
