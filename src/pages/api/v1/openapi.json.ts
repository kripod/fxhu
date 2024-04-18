import type { APIRoute } from "astro";
import type { OpenAPIV3_1 } from "openapi-types";

const OAS_VERSION = "3.1.0";

export const mediaType = "application/openapi+json;version=" + OAS_VERSION;

export const GET: APIRoute = (context) =>
  Response.json(
    {
      openapi: OAS_VERSION,
      info: {
        title: "FXHU",
        license: {
          name: "MIT",
          identifier: "MIT",
        },
        version: "1.0",
      },
      servers: [{ url: new URL("/api/v1", context.site).toString() }],
      paths: {
        "/symbols.json": {},
        "/symbols/{symbol}.json": {},
        "/symbols/{symbol}/{year}.json": {},
        "/years.json": {},
        "/years/{year}.json": {},
      },
      components: {
        parameters: {},
      },
      externalDocs: {
        url: context.site!.toString(),
      },
    } satisfies OpenAPIV3_1.Document,
    {
      headers: {
        "content-type": mediaType,
      },
    },
  );
