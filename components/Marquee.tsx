const TERMS: { label: string; serif?: boolean }[] = [
  { label: "Python" },
  { label: "MRP", serif: true },
  { label: "Large Language Models" },
  { label: "ETL" },
  { label: "Ollama", serif: true },
  { label: "Microsoft SQL Server" },
  { label: "RAG" },
  { label: "Forecasting", serif: true },
  { label: "Model Context Protocol" },
  { label: "Data Engineering" },
  { label: "Prompt Engineering", serif: true },
  { label: "Supply Chain" },
];

export function Marquee() {
  const run = [...TERMS, ...TERMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {run.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span className={`mq-item${t.serif ? " serif" : ""}`}>{t.label}</span>
            <span className="mq-sep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
