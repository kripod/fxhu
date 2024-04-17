import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const rates = await getCollection("rates");

const currencyPairsByYear = new Map<number, string[]>();
for (const rate of rates) {
  const years = [
    ...new Set(
      Object.keys(rate.data).map((date) => new Date(date).getUTCFullYear()),
    ),
  ];
  for (const year of years) {
    let currencyPairs = currencyPairsByYear.get(year);
    if (currencyPairs == null) {
      currencyPairs = [];
      currencyPairsByYear.set(year, currencyPairs);
    }
    currencyPairs.push(rate.id);
  }
}

export const GET: APIRoute = () =>
  Response.json(Object.fromEntries(currencyPairsByYear));
