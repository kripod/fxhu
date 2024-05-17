export function isDateStale(date: Date) {
  const pivot = new Date();
  pivot.setUTCDate(pivot.getUTCDate() - 30);
  return date < pivot;
}

export function stringifyDate(date: Date) {
  const dateTime = date.toISOString();
  return dateTime.slice(0, dateTime.indexOf("T"));
}
