import { z } from 'zod';

export const createTribeSchema = z.object({
  hindiName: z.string().min(1),
  englishName: z.string().min(1),
  shortDesc: z.string().min(1),
  image: z.string().url(),
  leftTitle: z.string().optional().nullable(),
  leftDesc: z.string().optional().nullable(),
  rightTitle: z.string().optional().nullable(),
  rightDesc: z.string().optional().nullable(),
  bottomDesc: z.string().optional().nullable(),
  cultureSections: z.any().optional(), // JSON
});

export const updateTribeSchema = createTribeSchema.partial();

export const createPersonalitySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  district: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  fullBio: z.string().optional().nullable(),
  author: z.string().optional().default('Admin'),
});

export const updatePersonalitySchema = createPersonalitySchema.partial();

export const createTribalArticleSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  images: z.array(z.string().url()).optional().default([]),
  author: z.string().min(1),
  tribe: z.string().min(1),
  publishedDate: z.string().optional(),
  readTime: z.number().optional(),
  tags: z.array(z.string()).optional().default([]),
  location: z.string().min(1),
});

export const updateTribalArticleSchema = createTribalArticleSchema.partial();

export type CreateTribeInput = z.infer<typeof createTribeSchema>;
export type CreatePersonalityInput = z.infer<typeof createPersonalitySchema>;
export type CreateTribalArticleInput = z.infer<typeof createTribalArticleSchema>;
