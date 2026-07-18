import { z } from 'zod';

const urlOrDataUri = z.string().refine(
  (val) => val.startsWith('data:image/') || /^https?:\/\/.+/.test(val),
  { message: 'Must be a valid URL or data URI' }
);

export const createCommunitySchema = z.object({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  bannerImageUrl: urlOrDataUri,
  logoImageUrl: urlOrDataUri,
  category: z.string().optional().nullable(),
  rules: z.array(z.string()).optional(),
});

export const updateCommunitySchema = createCommunitySchema.partial();

export const createCommunityPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional().nullable(),
  communityId: z.string().min(1),
  mediaUrl: z.string().optional().nullable(),
  mediaType: z.string().optional().nullable(),
  pollData: z.any().optional().nullable(),
});

export const updateCommunityPostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type CreateCommunityPostInput = z.infer<typeof createCommunityPostSchema>;
