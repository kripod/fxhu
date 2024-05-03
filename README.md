# FXHU

Exchange rates API sourced from the National Bank of Hungary (Magyar Nemzeti Bank, MNB). Unlimited & CORS-enabled.

## How it works

The project is powered by [Astro](https://astro.build/) and hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

Data gets scraped regularly using [this GitHub Actions workflow](./.github/workflows/scraper.yaml). Static file endpoints are generated from [the resulting files](./src/content/quoteRecords/) and then served through a CDN.

Documentation is built with [Starlight](https://starlight.astro.build/), leveraging [an OpenAPI renderer plugin](https://github.com/HiDeoo/starlight-openapi).
