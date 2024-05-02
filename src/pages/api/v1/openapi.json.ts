import type { APIRoute } from "astro";

import data from "./_openapi.json";

export const GET: APIRoute = () =>
  Response.json(data, {
    headers: {
      "content-type": "application/openapi+json",
    },
  });
