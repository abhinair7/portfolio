import { z } from "zod";
import { skills, experience, projects } from "./content";

// Structured-output contract for the role-adaptive engine. Shared so the API
// route and the client stay in lockstep with the content model's cardinality.
export const tailorSchema = z.object({
  roleName: z.string().describe("Short role title detected from the job description, e.g. 'Data Engineer'."),
  heroTagline: z.string().describe("Rewritten one-sentence hero tagline matching the role's tone. Real facts only."),
  skills: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().describe("Rewritten to lead with the technologies most relevant to the role."),
      })
    )
    .length(skills.length)
    .describe("One entry per skill card, in the page's existing order."),
  experience: z
    .array(
      z.object({
        index: z.number().int().min(0).max(experience.length - 1),
        bullets: z.array(z.string()).min(1),
        impacts: z.array(z.string()).min(1),
      })
    )
    .length(experience.length)
    .describe("All experience entries, reordered by relevance (most relevant first). Rewrite bullets to emphasize relevant work; keep every metric identical."),
  projectOrder: z
    .array(z.number().int().min(0).max(projects.length - 1))
    .length(projects.length)
    .describe("All project indices exactly once, most relevant first."),
  matchHighlights: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe("2-4 sentences on why this candidate fits the role, grounded in real experience."),
});

export type TailorSchema = z.infer<typeof tailorSchema>;
