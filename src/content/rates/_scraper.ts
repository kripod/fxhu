import * as fs from "node:fs/promises";

import { Agent, fetch } from "undici";
import * as XLSX from "xlsx";

import { currencyPair, isCurrency } from "../../utils/currency";
import { stringifyDate } from "../../utils/date";
import { roundTo, safeParseFloat } from "../../utils/number";

const QUOTE_CURRENCY = "HUF";
const DEFAULT_FRACTION_DIGITS = 2;

const response = await fetch(
  "https://www.mnb.hu/Root/ExchangeRate/arfolyam.xlsx",
  { dispatcher: new Agent({ connectTimeout: 300_000 }) },
);
if (!response.ok) {
  throw new Error("Cannot fetch sheet");
}

const data = await response.arrayBuffer();
const workbook = XLSX.read(data, {
  cellDates: true,
  cellText: false,
  cellHTML: false,
});
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

for (const [currency, rateByDate] of rateByDateByCurrency) {
  await using file = await fs.open(
    new URL(
      "./" + currencyPair(currency, QUOTE_CURRENCY) + ".json",
      import.meta.url,
    ),
    fs.constants.O_RDWR | fs.constants.O_CREAT,
  );

  const prevContents = await file.readFile("utf8");
  const entries = prevContents
    ? Object.entries<number>(JSON.parse(prevContents))
    : [];

  for (const [date, rate] of rateByDate) {
    entries.push([stringifyDate(date), rate]);
  }
  entries.sort(([aDate], [bDate]) => Date.parse(aDate) - Date.parse(bDate));

  await file.write(
    JSON.stringify(Object.fromEntries(entries), null, 2) + "\n",
    0,
  );
}
