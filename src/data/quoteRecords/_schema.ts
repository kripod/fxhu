import { z } from "astro/zod";

export const QuoteRecordSchema = z.record(z.string(), z.number());
export type QuoteRecord = z.output<typeof QuoteRecordSchema>;
