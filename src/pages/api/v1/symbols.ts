import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const rates = await getCollection("rates");

export const GET: APIRoute = () => Response.json(rates.map((rate) => rate.id));
