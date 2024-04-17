import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: docsSchema(),
});

const ratesCollection = defineCollection({
  type: "data",
  schema: z.record(z.string(), z.number()),
});

export const collections = {
  docs: docsCollection,
  rates: ratesCollection,
};
