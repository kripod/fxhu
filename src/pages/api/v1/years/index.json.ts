import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { quotesByYearBySymbol } from "../symbols/[symbol]/[year].json" with { type: "json" };

const quoteRecords = await getCollection("quoteRecords");

const quoteDates = new Set(
  quoteRecords.flatMap((quoteRecord) => Object.keys(quoteRecord.data)),
);
export const quoteYears = [
  ...new Set([...quoteDates].map((date) => new Date(date).getUTCFullYear())),
].sort((a, b) => a - b);

export const GET: APIRoute = () =>
  Response.json(
    Object.fromEntries(
      quoteYears.map((year) => [
        year,
        [...quotesByYearBySymbol]
          .filter(([, quotesByYear]) => quotesByYear.has(year))
          .map(([symbol]) => symbol),
      ]),
    ),
  );
