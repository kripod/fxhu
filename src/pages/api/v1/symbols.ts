import type { APIRoute } from "astro";

import { rateByDateByCurrencyPair } from "../_data";

export const GET: APIRoute = () =>
  Response.json([...rateByDateByCurrencyPair.keys()]);
