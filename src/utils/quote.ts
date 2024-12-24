import { z } from "astro/zod";
import { ISODateSchema } from "./date";
import { RateSchema } from "./number";

const QuoteSchema = z.tuple([ISODateSchema, RateSchema]);

export const QuoteRecordSchema = z.record(...QuoteSchema.items);
