import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
	schema: z.object({
		title: z.string().max(60).min(10),
		description: z.string().max(160).min(110).optional(),
		draft: z.boolean().default(false),
		tag: z.string(),
		date: z.string(),
		isPinned: z.boolean().default(false),
	}),
});

export const collections = {
	blog: blogCollection,
};
