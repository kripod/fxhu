import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: docsSchema(),
});

export const collections = {
  docs: docsCollection,
};
