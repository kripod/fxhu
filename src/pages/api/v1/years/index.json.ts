import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const quoteRecords = await getCollection("quoteRecords");

const currencyPairsByYear = new Map<number, string[]>();
for (const quoteRecord of quoteRecords) {
  const years = [
    ...new Set(
      Object.keys(quoteRecord.data).map((date) =>
        new Date(date).getUTCFullYear(),
      ),
    ),
  ];
  for (const year of years) {
    let currencyPairs = currencyPairsByYear.get(year);
    if (currencyPairs == null) {
      currencyPairs = [];
      currencyPairsByYear.set(year, currencyPairs);
    }
    currencyPairs.push(quoteRecord.id);
  }
}

export const GET: APIRoute = () =>
  Response.json(Object.fromEntries(currencyPairsByYear));
