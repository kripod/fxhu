import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const quoteRecords = await getCollection("quoteRecords");

const symbolsByYear = new Map<number, string[]>();
for (const quoteRecord of quoteRecords) {
  const years = [
    ...new Set(
      Object.keys(quoteRecord.data).map((date) =>
        new Date(date).getUTCFullYear(),
      ),
    ),
  ];
  for (const year of years) {
    let symbols = symbolsByYear.get(year);
    if (symbols == null) {
      symbols = [];
      symbolsByYear.set(year, symbols);
    }
    symbols.push(quoteRecord.id);
  }
}

export const GET: APIRoute = () =>
  Response.json(Object.fromEntries(symbolsByYear));
