import type { APIRoute } from "astro";

import data from "./_openapi.json";

export const mediaType = "application/openapi+json;version=" + data.openapi;

export const GET: APIRoute = () =>
  Response.json(data, {
    headers: {
      "content-type": mediaType,
    },
  });
