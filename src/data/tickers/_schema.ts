import { z } from "astro/zod";
import { roundToSafePrecision } from "../../utils/number";

const SymbolSchema = z.string().regex(/^[A-Z]+$/);

const ISODateSchema = z.string().date();
export const RateSchema = z
  .number()
  .positive()
  .transform((input) => roundToSafePrecision(input));

const QuoteSchema = z.tuple([ISODateSchema, RateSchema]);
const QuoteRecordSchema = z.record(...QuoteSchema.items);

export const TickerSchema = z.object({
  symbol: SymbolSchema,
  data: QuoteRecordSchema,
});
export type Ticker = z.output<typeof TickerSchema>;
