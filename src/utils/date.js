function padMonthOrDay(/** @type {number} */ value) {
  return value.toString().padStart(2, "0");
}

export function stringifyDate(/** @type {Date} */ date) {
  return (
    date.getUTCFullYear() +
    "-" +
    padMonthOrDay(date.getUTCMonth() + 1) +
    "-" +
    padMonthOrDay(date.getUTCDate())
  );
}
