import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://fxhu.kripod.dev/",
  integrations: [
    starlight({
      title: "FXHU",
      social: {
        github: "https://github.com/kripod/fxhu",
      },
      pagefind: false,
    }),
  ],
});
