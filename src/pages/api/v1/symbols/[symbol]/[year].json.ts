import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";

const tickers = await getCollection("tickers");

export const quotesByYearBySymbol = new Map(
  tickers.map((ticker) => {
    const quotes = Object.entries(ticker.data.data);
    return [
      ticker.data.symbol,
      Map.groupBy(quotes, ([date]) => new Date(date).getUTCFullYear()),
    ];
  }),
);

export const getStaticPaths = (() => {
  return [...quotesByYearBySymbol].flatMap(([symbol, quotesByYear]) =>
    [...quotesByYear].map(([year, quotes]) => ({
      params: {
        symbol,
        year: year.toString(),
      },
      props: Object.fromEntries(quotes),
    })),
  );
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
