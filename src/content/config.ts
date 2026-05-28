import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    role: z.string(),
    summary: z.string(),
    tech: z.array(z.string()),
    links: z.object({
      github: z.string(),
      demo: z.string().optional(),
    }),
    weight: z.number(),
    current: z.boolean().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { projects };
