export function stringifyDate(date: Date) {
  const dateTime = date.toISOString();
  return dateTime.slice(0, dateTime.indexOf("T"));
}
