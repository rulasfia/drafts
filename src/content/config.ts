import { defineCollection, z } from "astro:content";

const drafts = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		published: z.boolean(),
		publishedAt: z.date(),
	}),
});

export const collections = { drafts };
