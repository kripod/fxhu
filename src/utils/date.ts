import { z } from "astro/zod";

const AVG_DAYS_IN_MONTH = 30;

export const ISODateSchema = z.string().date();

export function isDateStale(date: Date) {
  const pivot = new Date();
  pivot.setUTCDate(pivot.getUTCDate() - AVG_DAYS_IN_MONTH);
  return date < pivot;
}

export function stringifyDate(date: Date) {
  const dateTime = date.toISOString();
  return dateTime.slice(0, dateTime.indexOf("T"));
}
