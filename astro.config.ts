import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    starlight({
      title: "FX Rates HU",
      social: {
        github: "https://github.com/kripod/fx-rates-hu",
      },
      pagefind: false,
    }),
  ],
});
