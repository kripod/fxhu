import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";

export default defineConfig({
  site: "https://fxhu.kripod.dev",
  integrations: [
    starlight({
      title: "FXHU",
      social: {
        github: "https://github.com/kripod/fxhu",
      },
      plugins: [
        starlightOpenAPI([
          {
            base: "docs/v1",
            collapsed: false,
            label: "Reference",
            schema: "./src/pages/api/v1/_openapi.json",
          },
        ]),
      ],
      sidebar: [...openAPISidebarGroups],
    }),
  ],
});
