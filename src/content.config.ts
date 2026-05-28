import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    links: z.object({
      github: z.string(),
      demo: z.string().optional(),
    }),
    weight: z.number().default(99),
    current: z.boolean().default(true),
  }),
});

export const collections = {
  projects: projectsCollection,
};
