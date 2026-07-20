import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  title: z.string().max(100).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  background: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
