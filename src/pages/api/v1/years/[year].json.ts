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
const quoteYears = new Set(
  [...quoteDates].map((date) => new Date(date).getUTCFullYear()),
);

export const getStaticPaths = (() => {
  return [...quoteYears].map((year) => ({
    params: { year: year.toString() },
    props: Object.fromEntries(
      quoteRecords.map((quoteRecord) => {
        const quotes = Object.entries(quoteRecord.data);
        const years = quotes.map(([date]) => new Date(date).getUTCFullYear());
        const start = years.indexOf(year);
        const end = years.lastIndexOf(year) + 1;
        return [
          quoteRecord.id,
          start >= 0 ? Object.fromEntries(quotes.slice(start, end)) : undefined,
        ];
      }),
    ),
  }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
