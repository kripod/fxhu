export const SITE_LOCALE = "en";

export const currencyNames = new Intl.DisplayNames(SITE_LOCALE, {
  type: "currency",
  fallback: "none",
});

export const regionNames = new Intl.DisplayNames(SITE_LOCALE, {
  type: "region",
  fallback: "none",
});
