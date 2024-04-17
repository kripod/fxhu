import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const quoteRecords = await getCollection("quoteRecords");

export const GET: APIRoute = () =>
  Response.json(
    Object.fromEntries(
      quoteRecords.map((quoteRecord) => {
        const lastEntry = Object.entries(quoteRecord.data).at(-1);
        return [quoteRecord.id, lastEntry];
      }),
    ),
  );
