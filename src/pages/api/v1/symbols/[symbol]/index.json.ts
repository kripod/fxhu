import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";

const tickers = await getCollection("tickers");

export const getStaticPaths = (() => {
  return tickers.map((ticker) => ({
    params: {
      symbol: ticker.data.symbol,
    },
    props: ticker.data.data,
  }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
