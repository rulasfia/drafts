import { defineCollection, z } from "astro:content";

const drafts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.string().array().optional().default([]),
    published: z.boolean(),
    publishedAt: z.date(),
    author: z.string().array().optional().default(["rulasfia"]),
  }),
});

export const collections = { drafts };
