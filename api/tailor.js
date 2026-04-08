export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { jobDescription } = req.body;
  if (!jobDescription || jobDescription.length < 20) {
    return res.status(400).json({ error: 'Please paste a valid job description.' });
  }

  const API_KEY = process.env.NVIDIA_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured.' });

  const resumeContext = `
CANDIDATE: Abhishek Vinod Nair

HERO/TAGLINE: AI analyst and solutions builder at UMass Boston. Designs intelligent systems that turn business complexity into clarity, from LLM-powered platforms to real-time analytics.

SKILLS:
1. AI & LLMs: Claude, OpenAI API, Anthropic API, Prompt Engineering, RAG Pipelines, Cerebras AI, LLM Agents, Hugging Face Transformers
2. Machine Learning: PyTorch, TensorFlow, scikit-learn, XGBoost, NLP, LSTM, Predictive Modeling, Time Series
3. Cloud & Data: AWS, Azure ML, Snowflake, Databricks, Google Cloud, Apache Spark, Firebase
4. Analytics & BI: Power BI, Tableau, Python (Pandas, NumPy), SQL, R, Statistical Analysis, Data Visualization

EXPERIENCE:
1. Graduate Assistant — MSIS, UMass Boston (Jan–May 2026, Boston MA)
   - Developed cyber-attack simulation artifacts aligned with MITRE ATT&CK framework for 50+ graduate students
   - Designed and delivered 8+ hands-on labs on persistence mechanisms, exfiltration detection, and timeline reconstruction
   - Created mitigation-focused exercises emphasizing artifact extraction and anomaly response
   - Impacts: 50+ Students, +35% Proficiency, -40% Recovery Time

2. Business Analyst Intern, Cypress Atlantic (Jun–Aug 2024, Boston MA)
   - Led end-to-end development of AI-powered restaurant automation platform using Firebase for 20+ users
   - Built Power BI dashboards with time series analysis and seasonal patterns for sales/inventory forecasting
   - Implemented real-time Firestore/Cloud Functions synchronization, eliminating 90% of manual data coordination
   - Impacts: -25% Food Waste, $15K+ Savings, +40% Adoption

3. Digital Specialist Engineer, Infosys (Jul 2022–May 2024, Chennai India)
   - Designed and delivered 3 major end-to-end enterprise applications using IBM RAD and Java/JSP/JavaScript
   - Optimized SQL queries and stored procedures with DBeaver, improving database performance by 40%
   - Led Jenkins CI/CD pipeline deployments, cutting deployment times by 50% with 99% success rate
   - Impacts: 3 Enterprise Apps, +40% DB Perf, 99% Deploy Rate

4. Graduate Engineer Trainee, Reliance Jio (Feb–Jul 2022, Mumbai India)
   - Gathered business requirements for Internal Auditing Website ensuring 100% compliance alignment
   - Developed responsive Angular web interfaces using HTML, CSS, and TypeScript, boosting engagement by 25%
   - Facilitated daily Scrum meetings for 10+ cross-functional team members, reducing deployment times by 4x
   - Impacts: +25% Engagement, 4x Faster Deploy, 100% Compliance

PROJECTS:
1. G.E.M. — Geopolitical Equilibrium Model (Astro, GSAP, FRED API, Cerebras AI)
   A live decision engine that benchmarks real-time economic data against 2,000 years of history and generates AI-powered strategy. Solo-built in 3 days.

2. Inventory & Sales Forecasting Dashboard (Power BI Pro, Firebase, Cloud Functions)
   Interactive Power BI dashboard with Firebase for real-time forecasting using historical and seasonal data. Automated ETL, improving operational visibility by 35%.

3. IMDB Movie Review Sentiment Analysis (PyTorch, LSTM, TorchText, NLP)
   Tokenized 50K IMDB reviews, trained a two-layer LSTM classifier achieving 86% accuracy. TensorBoard monitoring with reproducible inference pipelines.

EDUCATION:
- MS Business Analytics, UMass Boston (2024–2026)
- BE Computer Science, Sri Krishna College of Technology (2017–2021)
- Beta Gamma Sigma Honor Society (Top 20% Business Scholars, AACSB Accredited)
`;

  const prompt = `You are a portfolio tailoring AI. Given a candidate's full profile and a job description, rewrite the portfolio content to best match the role.

RULES:
- Only rephrase and reorder existing content. NEVER fabricate skills, experiences, or metrics.
- Keep all impact numbers exactly as they are.
- Reword bullets to emphasize aspects most relevant to the JD.
- Reorder skills and experiences by relevance to the JD.
- Rewrite the hero tagline to match the role tone.
- For each skill card, rewrite the description to lead with the most relevant technologies.
- For each experience entry, rewrite bullets to emphasize relevant work (keep same facts).
- Suggest which project should be featured first.

${resumeContext}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "roleName": "short role title detected from JD",
  "heroTagline": "rewritten 1-sentence tagline",
  "skills": [
    {"title": "card title", "icon": "original icon text", "description": "rewritten description leading with most relevant tech"},
    {"title": "card title", "icon": "original icon text", "description": "rewritten description"},
    {"title": "card title", "icon": "original icon text", "description": "rewritten description"},
    {"title": "card title", "icon": "original icon text", "description": "rewritten description"}
  ],
  "experience": [
    {
      "index": 0,
      "bullets": ["rewritten bullet 1", "rewritten bullet 2", "rewritten bullet 3"],
      "impacts": ["impact1", "impact2", "impact3"]
    },
    {
      "index": 1,
      "bullets": ["rewritten bullet 1", "rewritten bullet 2", "rewritten bullet 3"],
      "impacts": ["impact1", "impact2", "impact3"]
    },
    {
      "index": 2,
      "bullets": ["rewritten bullet 1", "rewritten bullet 2", "rewritten bullet 3"],
      "impacts": ["impact1", "impact2", "impact3"]
    },
    {
      "index": 3,
      "bullets": ["rewritten bullet 1", "rewritten bullet 2", "rewritten bullet 3"],
      "impacts": ["impact1", "impact2", "impact3"]
    }
  ],
  "projectOrder": [0,1,2],
  "matchHighlights": ["sentence 1", "sentence 2", "sentence 3"]
}`;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: [
          { role: 'system', content: 'You are a JSON-only response bot. Return only valid JSON, no markdown, no explanation.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: 'NVIDIA API error', details: data });
    }

    const text = data.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: 'Empty response from AI' });

    // Parse JSON from response (strip markdown backticks if present)
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleaned);

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process', message: err.message });
  }
}
