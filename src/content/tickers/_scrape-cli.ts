import * as fs from "node:fs/promises";
import * as util from "node:util";
import * as XLSX from "xlsx";
import { stringifyDate } from "../../utils/date";
import { RateSchema, safeParseFloat } from "../../utils/number";
import {
  currencyPairSymbol,
  CurrencySchema,
  QUOTE_CURRENCY,
} from "../../utils/symbol";
import { TickerSchema, type Ticker } from "../../utils/ticker";

const SOURCE_URL = "https://www.mnb.hu/Root/ExchangeRate/arfolyam.xlsx";

const args = util.parseArgs({
  options: {
    full: {
      type: "boolean",
    },
  },
});

const response = await fetch(
  args.values.full
    ? SOURCE_URL
    : `${SOURCE_URL}?year=${new Date().getUTCFullYear()}`,
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
const sheetName = workbook.SheetNames.at(0);
const sheet = sheetName != null ? workbook.Sheets[sheetName] : undefined;

if (sheet == null) {
  throw new Error("Cannot open sheet");
}

const [unitRow, ...rateRows] = XLSX.utils.sheet_to_json<
  Record<string, unknown>
>(sheet, { UTC: true });

if (unitRow == null) {
  throw new Error("Cannot parse minor units of currencies");
}

const currencies = Object.keys(unitRow).filter((key) => {
  const currencyResult = CurrencySchema.safeParse(key);
  return currencyResult.success && currencyResult.data !== QUOTE_CURRENCY;
});

const unitByCurrency = new Map(
  currencies.map((currency) => [currency, safeParseFloat(unitRow[currency])]),
);

const rateByDateByCurrency = new Map(
  currencies.map((currency) => [currency, new Map<Date, number>()]),
);

for (const rateRow of rateRows) {
  let date: Date | undefined;

  for (const [key, value] of Object.entries(rateRow)) {
    if (date != null) {
      const offsetRate = safeParseFloat(value);
      if (offsetRate != null) {
        const unit = unitByCurrency.get(key);
        if (unit != null) {
          const rateResult = RateSchema.safeParse(offsetRate / unit);
          if (rateResult.success) {
            const rateByDate = rateByDateByCurrency.get(key);
            rateByDate?.set(date, rateResult.data);
          }
        }
      }
    } else if (value instanceof Date) {
      date = value;
    }
  }
}

for (const [currency, rateByDate] of rateByDateByCurrency) {
  const symbol = currencyPairSymbol(currency, QUOTE_CURRENCY);
  await using file = await fs.open(
    new URL(`./${symbol}.json`, import.meta.url),
    "a+",
  );

  const prevContents = await file.readFile("utf8");
  const quotes = prevContents
    ? Object.entries(TickerSchema.parse(JSON.parse(prevContents)).data)
    : [];

  for (const [date, rate] of rateByDate) {
    quotes.push([stringifyDate(date), rate]);
  }
  quotes.sort(([aDate], [bDate]) => Date.parse(aDate) - Date.parse(bDate));

  const contents: Ticker = {
    symbol,
    data: Object.fromEntries(quotes),
  };
  await file.truncate();
  await file.writeFile(`${JSON.stringify(contents, null, 2)}\n`);
}
