import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { TickerSchema } from "./content/tickers/_schema";

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

const tickers = defineCollection({
  loader: glob({ pattern: "[^_]*.json", base: "./src/content/tickers" }),
  schema: TickerSchema,
});

export const collections = {
  docs,
  tickers,
};
