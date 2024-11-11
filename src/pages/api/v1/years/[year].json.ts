import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";

import { quotesByYearBySymbol } from "../symbols/[symbol]/[year].json" with { type: "json" };
import { quoteYears } from "./index.json" with { type: "json" };

export const getStaticPaths = (() => {
  return quoteYears.map((year) => ({
    params: {
      year: year.toString(),
    },
    props: Object.fromEntries(
      [...quotesByYearBySymbol].map(([symbol, quotesByYear]) => {
        const quotes = quotesByYear.get(year);
        return [
          symbol,
          quotes != null ? Object.fromEntries(quotes) : undefined,
        ];
      }),
    ),
  }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
