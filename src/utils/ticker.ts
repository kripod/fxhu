import { z } from "astro/zod";

import { QuoteRecordSchema } from "./quote";
import { SymbolSchema } from "./symbol";

export const TickerSchema = z.object({
  symbol: SymbolSchema,
  data: QuoteRecordSchema,
});
export type Ticker = z.output<typeof TickerSchema>;
