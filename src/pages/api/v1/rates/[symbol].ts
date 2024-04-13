import type { APIRoute, GetStaticPaths } from "astro";

import { stringifyDate } from "../../../../utils/date";
import { rateByDateByCurrencyPair } from "../../_data";

type Props = Record<string, number>;

export const GET: APIRoute = (context) => Response.json(context.props);

export const getStaticPaths: GetStaticPaths = () => {
  return [...rateByDateByCurrencyPair].map(([currencyPair, rateByDate]) => ({
    params: { symbol: currencyPair },
    props: Object.fromEntries(
      [...rateByDate].map(([date, rate]) => [stringifyDate(date), rate]),
    ) satisfies Props,
  }));
};
