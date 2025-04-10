import { defineCollection, z } from "astro:content";

const drafts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.string().array().optional().default([]),
    published: z.boolean().optional().default(false),
    visibility: z.enum(["public", "unlisted"]).optional().default("unlisted"),
    publishedAt: z.date().optional().default(new Date()),
    author: z.string().array().optional().default(["rulasfia"]),
  }),
});

export const collections = { drafts };
