import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		published: z.date(),
		updated: z.date().optional(),
		tags: z.array(z.string()).optional(),
		category: z.string().optional(),
		draft: z.boolean().default(false),
		license: z.object({
			name: z.string(),
			url: z.string(),
		}).optional(),
	}),
});

export const collections = {
	posts: postsCollection,
};