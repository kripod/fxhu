import * as fs from "node:fs";

import * as XLSX from "xlsx";

import { roundTo, safeParseFloat } from "./utils/number.js";

const DATE_KEY = "Dátum/ISO";
const DEFAULT_FRACTION_DIGITS = 2;

XLSX.set_fs(fs);

const workbook = XLSX.readFile("./arfolyam.xlsx", { cellDates: true });
const sheetName = workbook.SheetNames[0];
const sheet = sheetName != null ? workbook.Sheets[sheetName] : undefined;

if (sheet == null) {
  throw new Error("Could not open sheet.");
}

/** @type {Record<string, unknown>[]} */
const rows = XLSX.utils.sheet_to_json(sheet, { UTC: true });

const unitRow = rows.shift();
if (unitRow == null) {
  throw new Error("Could not parse unit for each currency.");
}

const unitByCurrency = new Map(
  Object.entries(unitRow).map(([key, value]) => [key, safeParseFloat(value)]),
);

/** @type {Map<string, Map<Date, number>>} */
const rateByDateByCurrency = new Map();

for (const row of rows) {
  const date = row[DATE_KEY];

  if (date instanceof Date) {
    for (const [key, value] of Object.entries(row)) {
      if (key !== DATE_KEY) {
        const unit = unitByCurrency.get(key);

        if (unit != null) {
          let rateByDate = rateByDateByCurrency.get(key);
          if (rateByDate == null) {
            rateByDate = new Map();
            rateByDateByCurrency.set(key, rateByDate);
          }

          const offsetRate = safeParseFloat(value);
          if (offsetRate != null) {
            const rate = roundTo(
              offsetRate / unit,
              DEFAULT_FRACTION_DIGITS + Math.ceil(Math.log10(unit)),
            );
            // Sanity check
            if (rate > 0) {
              rateByDate.set(date, rate);
            }
          }
        }
      }
    }
  }
}

console.log(rateByDateByCurrency);
