import type { APIRoute } from "astro";

import { mediaType } from "../api/v1/openapi.json";

export const GET: APIRoute = (context) =>
  Response.json(
    {
      linkset: [
        {
          anchor: new URL("/api/v1/", context.site),
          "service-desc": [
            {
              href: new URL("/api/v1/openapi.json", context.site),
              type: mediaType,
            },
          ],
          "service-doc": [
            {
              href: new URL("/docs/v1/", context.site),
              type: "text/html",
            },
          ],
        },
      ],
    },
    {
      headers: {
        "content-type": "application/linkset+json",
      },
    },
  );
