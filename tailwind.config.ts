import starlightPlugin from "@astrojs/starlight-tailwind";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: colors.blue,
        gray: colors.zinc,
      },
    },
  },
  plugins: [starlightPlugin()],
} satisfies Config;
