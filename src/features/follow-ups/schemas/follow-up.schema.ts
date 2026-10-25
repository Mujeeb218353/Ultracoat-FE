import { z } from "zod";

export const followUpSchema = z.object({
  purpose: z.string().trim().min(1, "Purpose is required"),
  remarks: z.string().trim().min(1, "Remarks are required"),
  nextFollowUpDate: z.iso.datetime().refine((date) => new Date(date) > new Date(), {
    message: "Next follow-up date must be in the future",
  }).optional(),
});

export const createFollowUpSchema = followUpSchema.extend({
  quotationId: z.uuid(),
});

export const updateFollowUpSchema = followUpSchema.extend({
  id: z.uuid(),
});