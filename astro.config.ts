import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";

const site = "https://fxhu.kripod.dev";

export default defineConfig({
  site,
  trailingSlash:
    // TODO: Use 'always', see: https://github.com/withastro/astro/issues/10149
    process.env.NODE_ENV === "production" ? "always" : "ignore",
  integrations: [
    starlight({
      title: "FXHU",
      description:
        "Exchange rates API sourced from the National Bank of Hungary (Magyar Nemzeti Bank, MNB). Unlimited & CORS-enabled.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kripod/fxhu",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/kripod/fxhu/edit/main/",
      },
      plugins: [
        starlightOpenAPI([
          {
            base: "docs/v1",
            schema: "./src/pages/api/v1/_openapi.json",
            sidebar: {
              collapsed: false,
              label: "Reference",
            },
          },
        ]),
      ],
      sidebar: [
        ...openAPISidebarGroups,
        {
          label: "Demo",
          autogenerate: {
            directory: "demo",
          },
        },
      ],
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
            href: "/assets/logo-maskable-180.png",
            sizes: "180x180",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: new URL("/assets/social-image.png", site).toString(),
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:width",
            content: "1200",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:height",
            content: "628",
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
      customCss: ["./src/custom-styles.css"],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    headingIdCompat: true,
    preserveScriptOrder: true,
    staticImportMetaEnv: true,
  },
});
