import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { TickerSchema } from "./utils/ticker";

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
