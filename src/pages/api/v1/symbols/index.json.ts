import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const rates = await getCollection("rates");

export const GET: APIRoute = () =>
  Response.json(
    Object.fromEntries(
      rates.map((rate) => {
        const lastEntry = Object.entries(rate.data).at(-1);
        return [rate.id, lastEntry];
      }),
    ),
  );
