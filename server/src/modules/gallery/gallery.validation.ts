import { z } from 'zod';

export const createGalleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  category: z.string().min(1),
});

export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>;
