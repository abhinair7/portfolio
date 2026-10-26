# Portfolio: Abhishek Vinod Nair

Personal portfolio for an AI engineer, live at **https://abhisheknair.vercel.app**. The page tells a career story (frontend, full-stack, business analytics, AI engineering) and includes a role-adaptive engine: paste a job description and the page re-orders and re-words itself using only real content.

## Key features

- **Single source of truth.** `lib/content.ts` holds the profile, experience, projects and skills. The rendered page and the tailoring engine both read from it, so they cannot drift apart.
- **Role-adaptive "Tailor this page" engine.** `POST /api/tailor` takes a job description and returns a schema-validated result: a role name, a rewritten hero tagline, reworded skill cards, re-ordered experience and projects.
- **Guardrails against invented content.** The model is told to rephrase and reorder only real content and to keep every number identical. The output schema fixes the number of skills, experience entries and projects, so the model cannot add or drop items. Proprietary projects carry no public links, and none are generated.
- **Honest project cards.** Each project states the problem, the audience, the key trade-off and the outcome. Employer systems that cannot be published are described by architecture and results instead of linked.

## Tech stack

- **App:** Next.js (App Router), React, TypeScript, Tailwind CSS, anime.js
- **AI layer:** Vercel AI SDK (`generateObject`) with a Zod output schema, calling `meta/llama-3.1-8b-instruct` through NVIDIA's OpenAI-compatible API at temperature 0.2
- **Hosting:** Vercel (deploys from `main`)

## Setup and usage

```bash
npm install
echo "NVIDIA_API_KEY=your_key" > .env.local   # only needed for the Tailor feature
npm run dev                                    # http://localhost:3000
npm run build && npm start                     # production build
```

Without `NVIDIA_API_KEY` the site renders normally and the Tailor endpoint returns a clear "API key not configured" error.

## Architecture

```
lib/content.ts  --->  page sections (Hero, Journey, Experience, Projects, Skills, Education, Contact)
      |
      +----------->  app/api/tailor/route.ts  --->  generateObject + tailorSchema (lib/tailor-schema.ts)
                                                          |
                                      TailorContext / TailorEngine (client) re-orders and re-words the page
```

## Limitations

- The tailoring engine uses a small 8B model, so rewritten phrasing can be uneven. Facts and numbers are constrained by the prompt and schema, but the output is not independently fact-checked.
- No automated tests or CI yet.
- Employer systems shown on the page are proprietary and have no public code.

## Contact

a.nair002@umb.edu · linkedin.com/in/abhishek-nair-b64469196 · github.com/abhinair7
