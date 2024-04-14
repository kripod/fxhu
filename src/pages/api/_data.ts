import * as fs from "node:fs/promises";

import * as XLSX from "xlsx";

import { currencyPair, isCurrency } from "../../utils/currency";
import { roundTo, safeParseFloat } from "../../utils/number";

const QUOTE_CURRENCY = "HUF";
const DEFAULT_FRACTION_DIGITS = 2;

const workbook = XLSX.read(
  await fs.readFile(new URL("./_dataSourceSample.xlsx", import.meta.url)),
  {
    cellDates: true,
    cellText: false,
    cellHTML: false,
  },
);
const sheetName = workbook.SheetNames[0];
const sheet = sheetName != null ? workbook.Sheets[sheetName] : undefined;

if (sheet == null) {
  throw new Error("Cannot open sheet");
}

const [unitRow, ...rateRows] = XLSX.utils.sheet_to_json<
  Record<string, unknown>
>(sheet, { UTC: true });

if (unitRow == null) {
  throw new Error("Cannot parse currency units");
}

const currencies = Object.keys(unitRow).filter(
  (key) => isCurrency(key) && key !== QUOTE_CURRENCY,
);

const unitByCurrency = new Map(
  currencies.map((currency) => [currency, safeParseFloat(unitRow[currency])]),
);

const rateByDateByCurrency = new Map(
  currencies.map((currency) => [currency, new Map<Date, number>()]),
);

for (const rateRow of rateRows) {
  let date: Date | undefined;

  for (const [key, value] of Object.entries(rateRow)) {
    if (value instanceof Date) {
      date = value;
    } else if (date != null) {
      const unit = unitByCurrency.get(key);
      if (unit != null) {
        const offsetRate = safeParseFloat(value);
        if (offsetRate != null) {
          const rate = roundTo(
            offsetRate / unit,
            DEFAULT_FRACTION_DIGITS + Math.ceil(Math.log10(unit)),
          );

          // Sanity check
          if (rate > 0) {
            const rateByDate = rateByDateByCurrency.get(key);
            rateByDate?.set(date, rate);
          }
        }
      }
    }
  }
}

export const rateByDateByCurrencyPair = new Map(
  [...rateByDateByCurrency].map(([currency, rateByDate]) => [
    currencyPair(currency, QUOTE_CURRENCY),
    rateByDate,
  ]),
);
