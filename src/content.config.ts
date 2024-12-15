import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { TickerSchema } from "./data/tickers/_schema";

const docs = defineCollection({
  loader:
    // TODO: Use `docsLoader()` from "@astrojs/starlight/loaders"
    // https://github.com/withastro/starlight/issues/2698
    glob({
      pattern: "**/[^_]*.{markdown,mdown,mkdn,mkd,mdwn,md,mdx}",
      base: "./src/data/docs",
    }),
  schema: docsSchema(),
});

const tickers = defineCollection({
  loader: glob({ pattern: "[^_]*.json", base: "./src/data/tickers" }),
  schema: TickerSchema,
});

export const collections = {
  docs,
  tickers,
};
