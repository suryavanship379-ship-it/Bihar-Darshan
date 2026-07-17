import { z } from 'zod';

export const createCommunitySchema = z.object({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  bannerImageUrl: z.string().url(),
  logoImageUrl: z.string().url(),
  category: z.string().optional().nullable(),
  rules: z.array(z.string()).optional(),
});

export const updateCommunitySchema = createCommunitySchema.partial();

export const createCommunityPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  communityId: z.string().uuid(),
  mediaUrl: z.string().url().optional().nullable(),
  mediaType: z.enum(['IMAGE', 'VIDEO']).optional().nullable(),
  pollData: z.any().optional().nullable(),
});

export const updateCommunityPostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type CreateCommunityPostInput = z.infer<typeof createCommunityPostSchema>;
