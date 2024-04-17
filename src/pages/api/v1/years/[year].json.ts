import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";

const quoteRecords = await getCollection("quoteRecords");

const quoteDates = new Set(
  quoteRecords.flatMap((quoteRecord) => Object.keys(quoteRecord.data)),
);
export const quoteYears = new Set(
  [...quoteDates].map((date) => new Date(date).getUTCFullYear()),
);

export const quotesByYearBySymbol = new Map(
  quoteRecords.map((quoteRecord) => {
    const quotes = Object.entries(quoteRecord.data);
    return [
      quoteRecord.id,
      Map.groupBy(quotes, ([date]) => new Date(date).getUTCFullYear()),
    ];
  }),
);

export const getStaticPaths = (() => {
  return [...quoteYears].map((year) => ({
    params: { year: year.toString() },
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
