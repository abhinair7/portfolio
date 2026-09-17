import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { tailorSchema } from "@/lib/tailor-schema";
import { profile, skills, experience, projects, education, certification } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 30;

// Build the resume context from the single source of truth so the model can
// never be prompted with stale content.
function buildResumeContext(): string {
  const skillLines = skills
    .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
    .join("\n");
  const expLines = experience
    .map(
      (e, i) =>
        `INDEX ${i} — ${e.role}, ${e.company} (${e.start}–${e.end}, ${e.location})\n` +
        e.bullets.map((b) => `   - ${b}`).join("\n") +
        `\n   Impacts: ${e.impacts.join(", ")}`
    )
    .join("\n\n");
  const projLines = projects
    .map(
      (p, i) =>
        `INDEX ${i} — ${p.name} (${p.tags.join(", ")})${p.proprietary ? " [PROPRIETARY, no public link]" : ""}\n   ${p.summary}`
    )
    .join("\n\n");

  return [
    `CANDIDATE: ${profile.name}`,
    `TAGLINE: ${profile.tagline}`,
    ``,
    `SKILLS (${skills.length} cards, in page order):`,
    skillLines,
    ``,
    `EXPERIENCE (${experience.length} entries):`,
    expLines,
    ``,
    `PROJECTS (${projects.length} entries, indices 0-${projects.length - 1}):`,
    projLines,
    ``,
    `EDUCATION:`,
    education.map((e) => `- ${e.degree}, ${e.school} (${e.date})`).join("\n"),
    `- ${certification.title}: ${certification.badges.join(", ")}`,
  ].join("\n");
}

export async function POST(req: Request) {
  let jobDescription: string;
  try {
    const body = await req.json();
    jobDescription = String(body?.jobDescription ?? "").slice(0, 8000);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (jobDescription.trim().length < 20) {
    return NextResponse.json({ error: "Please paste a longer job description." }, { status: 400 });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }

  // NVIDIA's inference API is OpenAI-compatible, so we point the OpenAI provider at it.
  const nvidia = createOpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey,
  });

  const system =
    "You are a portfolio tailoring engine. Rephrase and reorder ONLY the candidate's real content to fit the job. " +
    "Never fabricate skills, employers, projects, links, or metrics. Keep every number identical. " +
    "Proprietary projects have no public links — never invent one.";

  const prompt =
    `${buildResumeContext()}\n\n` +
    `JOB DESCRIPTION:\n${jobDescription}\n\n` +
    `Tailor the portfolio to this role. Reorder experience (return all entries, most relevant first, each with its original index) ` +
    `and projects (return all indices, most relevant first). Rewrite skill descriptions and experience bullets to emphasize what matters ` +
    `for this role while keeping the same facts and metrics.`;

  try {
    const { object } = await generateObject({
      model: nvidia("meta/llama-3.1-8b-instruct"),
      schema: tailorSchema,
      system,
      prompt,
      temperature: 0.2,
    });
    return NextResponse.json(object, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to tailor the portfolio.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
