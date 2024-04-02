export function roundTo(
  /** @type {number} */ value,
  /** @type {number} */ fractionDigits,
) {
  return Number(
    Math.round(Number(value + "e+" + fractionDigits)) + "e-" + fractionDigits,
  );
}

export function safeParseFloat(/** @type {unknown} */ value) {
  const parsed =
    typeof value === "number"
      ? value
      : Number(String(value).trim() || Number.NaN);
  return Number.isFinite(parsed)
    ? parsed || 0 // Treat `-0` as `0`
    : null;
}
