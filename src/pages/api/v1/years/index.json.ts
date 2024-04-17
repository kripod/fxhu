import type { APIRoute } from "astro";

import { quoteYears, quotesByYearBySymbol } from "./[year].json";

export const GET: APIRoute = () =>
  Response.json(
    Object.fromEntries(
      [...quoteYears].map((year) => [
        year,
        [...quotesByYearBySymbol]
          .filter(([, quotesByYear]) => quotesByYear.has(year))
          .map(([symbol]) => symbol),
      ]),
    ),
  );
