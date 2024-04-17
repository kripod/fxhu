import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";

const rates = await getCollection("rates");

export const getStaticPaths = (() => {
  return rates.map((rate) => ({
    params: { symbol: rate.id },
    props: rate.data,
  }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
