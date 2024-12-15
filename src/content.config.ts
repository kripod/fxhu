import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { QuoteRecordSchema } from "./data/quoteRecords/_schema";

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

const quoteRecords = defineCollection({
  loader: glob({ pattern: "[^_]*.json", base: "./src/data/quoteRecords" }),
  schema: QuoteRecordSchema,
});

export const collections = {
  docs,
  quoteRecords,
};
