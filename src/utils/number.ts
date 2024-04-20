export function roundTo(value: number, fractionDigits: number) {
  return Number(
    Math.round(Number(value + "e+" + fractionDigits)) + "e-" + fractionDigits,
  );
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
