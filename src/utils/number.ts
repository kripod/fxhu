import { z } from "astro/zod";

const BINARY64_BASE = 2;
const BINARY64_PRECISION = 53;
const MAX_SAFE_PRECISION = Math.trunc(
  (BINARY64_PRECISION - 1) * Math.log10(BINARY64_BASE),
);

export const RateSchema = z
  .number()
  .positive()
  .transform((input) => roundToSafePrecision(input));

function roundToSafePrecision(value: number) {
  return Number(value.toPrecision(MAX_SAFE_PRECISION));
}

export function safeParseFloat(value: unknown) {
  const parsed =
    typeof value === "number"
      ? value
      : Number(value?.toString().trim() || Number.NaN);
  return Number.isFinite(parsed)
    ? parsed || 0 // Maps `-0` to `+0`
    : null;
}
