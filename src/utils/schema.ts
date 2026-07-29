import { z } from "zod";
import {
  QUOTATION_STATUS,
  JOB_STATUS,
} from "./types";

const STATUS_VALUES = [
  ...Object.values(QUOTATION_STATUS),
  ...Object.values(JOB_STATUS),
] as const;

export const filters = z.object({
  skip: z.number("Invalid skip").min(0).optional(),
  limit: z.number("Invalid limit").min(0).optional(),
  search: z.string("Invalid search").optional(),
  status: z.enum(STATUS_VALUES).optional(),
});

export const params = z.object({
  id: z.uuid("Invalid ID format"),
});