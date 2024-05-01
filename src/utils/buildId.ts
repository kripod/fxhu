export const buildId = import.meta.env.CF_PAGES_COMMIT_SHA
  ? import.meta.env.CF_PAGES_COMMIT_SHA.slice(0, 7)
  : Date.now().toString();
