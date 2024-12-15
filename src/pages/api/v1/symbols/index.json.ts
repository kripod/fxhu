import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const tickers = await getCollection("tickers");

export const GET: APIRoute = () =>
  Response.json(
    Object.fromEntries(
      tickers.map((ticker) => {
        const lastQuote = Object.entries(ticker.data.data).at(-1);
        return [ticker.data.symbol, lastQuote];
      }),
    ),
  );
