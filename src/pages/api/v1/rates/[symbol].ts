import type { APIRoute, GetStaticPaths } from "astro";

import rateByDateByCurrencyPair from "../../_data.json";

type Props = Record<string, number>;

export const GET: APIRoute<Props> = (context) => Response.json(context.props);

export const getStaticPaths: GetStaticPaths = () => {
  return Object.entries(rateByDateByCurrencyPair).map(
    ([currencyPair, rateByDate]) => ({
      params: { symbol: currencyPair },
      props: rateByDate satisfies Props,
    }),
  );
};
