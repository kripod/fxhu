import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  type: "content",
  schema: docsSchema(),
});

const quoteRecords = defineCollection({
  type: "data",
  schema: z.record(z.string(), z.number()),
});

export const collections = {
  docs,
  quoteRecords,
};
