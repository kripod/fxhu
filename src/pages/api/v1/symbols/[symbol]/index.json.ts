import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";

const quoteRecords = await getCollection("quoteRecords");

export const getStaticPaths = (() => {
  return quoteRecords.map((quoteRecord) => ({
    params: {
      symbol: quoteRecord.id,
    },
    props: quoteRecord.data,
  }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = (context) =>
  Response.json(context.props);
