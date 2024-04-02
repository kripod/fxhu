import * as fs from "node:fs";

import * as XLSX from "xlsx";

import { stringifyDate } from "./utils/date.js";
import { roundTo, safeParseFloat } from "./utils/number.js";

const BASE_CURRENCY = "HUF";
const DATE_KEY = "Dátum/ISO";
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

const unitByCurrency = new Map(
  Object.entries(unitRow).map(([key, value]) => [key, safeParseFloat(value)]),
);

/** @type {Map<string, Map<Date, number>>} */
const rateByDateByCurrency = new Map();

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
              let rateByDate = rateByDateByCurrency.get(key);
              if (rateByDate == null) {
                rateByDate = new Map();
                rateByDateByCurrency.set(key, rateByDate);
              }
              rateByDate.set(date, rate);
            }
          }
        }
      }
    }
  }
}

for (const [currency, rateByDate] of rateByDateByCurrency) {
  console.log(
    currency + BASE_CURRENCY,
    Object.fromEntries(
      [...rateByDate].map(([date, rate]) => [stringifyDate(date), rate]),
    ),
  );
}
