import { z } from 'zod';

export const discoverCategoryEnum = z.enum(['FOOD', 'FESTIVAL', 'CRAFT', 'HERITAGE', 'WILDLIFE']);

export const createDiscoverSchema = z.object({
  title: z.string().min(1),
  category: discoverCategoryEnum,
  image: z.string().url(),
  description: z.string().min(1),
  featured: z.boolean().optional().default(false),
  author: z.string().optional().default('Admin'),
});

export const updateDiscoverSchema = createDiscoverSchema.partial();

export type CreateDiscoverInput = z.infer<typeof createDiscoverSchema>;
export type UpdateDiscoverInput = z.infer<typeof updateDiscoverSchema>;
