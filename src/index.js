import * as fs from "node:fs";

import * as XLSX from "xlsx";

import { stringifyDate } from "./utils/date.js";
import { roundTo, safeParseFloat } from "./utils/number.js";

const DATE_KEY = "Dátum/ISO";
const QUOTE_CURRENCY = "HUF";
const DEFAULT_FRACTION_DIGITS = 2;

XLSX.set_fs(fs);

const workbook = XLSX.readFile("./arfolyam.xlsx", {
  cellDates: true,
  cellText: false,
  cellHTML: false,
});
const sheetName = workbook.SheetNames[0];
const sheet = sheetName != null ? workbook.Sheets[sheetName] : undefined;

if (sheet == null) {
  throw new Error("Cannot open sheet");
}

/** @type {Record<string, unknown>[]} */
const [unitRow, ...rateRows] = XLSX.utils.sheet_to_json(sheet, { UTC: true });

if (unitRow == null) {
  throw new Error("Cannot parse currency units");
}

const currencies = Object.keys(unitRow).filter(
  (key) => key !== DATE_KEY && key !== QUOTE_CURRENCY,
);

const unitByCurrency = new Map(
  currencies.map((currency) => [currency, safeParseFloat(unitRow[currency])]),
);

/** @type {Map<string, Map<Date, number>>} */
const rateByDateByCurrency = new Map(
  currencies.map((currency) => [currency, new Map()]),
);

for (const rateRow of rateRows) {
  const date = rateRow[DATE_KEY];

  if (date instanceof Date) {
    for (const [key, value] of Object.entries(rateRow)) {
      if (key !== DATE_KEY) {
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
}

for (const [currency, rateByDate] of rateByDateByCurrency) {
  console.log(
    currency + QUOTE_CURRENCY,
    Object.fromEntries(
      [...rateByDate].map(([date, rate]) => [stringifyDate(date), rate]),
    ),
  );
}
