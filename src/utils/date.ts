function padMonthOrDay(value: number) {
  return value.toString().padStart(2, "0");
}

export function stringifyDate(date: Date) {
  return (
    date.getUTCFullYear() +
    "-" +
    padMonthOrDay(date.getUTCMonth() + 1) +
    "-" +
    padMonthOrDay(date.getUTCDate())
  );
}
