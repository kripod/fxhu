import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";

import { socialImageHeight, socialImageWidth } from "./src/utils/socialImage";

export default defineConfig({
  site: "https://fxhu.kripod.dev",
  trailingSlash:
    // TODO: Use 'always', see: https://github.com/withastro/astro/issues/10149
    import.meta.env.PROD ? "always" : "ignore",
  integrations: [
    starlight({
      title: "FXHU",
      description:
        "Exchange rates API sourced from the National Bank of Hungary (Magyar Nemzeti Bank, MNB).",
      social: {
        github: "https://github.com/kripod/fxhu",
      },
      editLink: {
        baseUrl: "https://github.com/kripod/fxhu/edit/main/",
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
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "48x48",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/favicon-180.png",
            sizes: "180x180",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/assets/social-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:width",
            content: socialImageWidth.toString(),
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:height",
            content: socialImageHeight.toString(),
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "summary_large_image",
          },
        },
      ],
    }),
  ],
});
