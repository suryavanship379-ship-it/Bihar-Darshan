import { z } from 'zod';

export const createJourneySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  stops: z.array(z.string()).optional().default([]),
});

export const updateJourneySchema = createJourneySchema.partial();

export type CreateJourneyInput = z.infer<typeof createJourneySchema>;
