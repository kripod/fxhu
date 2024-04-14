import type { APIRoute } from "astro";

import rateByDateByCurrencyPair from "../_data.json";

export const GET: APIRoute = () =>
  Response.json(Object.keys(rateByDateByCurrencyPair));
