"use client";

import { useState } from "react";
import { useTailor, type TailorResult } from "./TailorContext";

export function TailorEngine() {
  const { result, apply, reset } = useTailor();
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    if (jd.trim().length < 20) {
      setStatus("Paste a longer job description.");
      return;
    }
    setLoading(true);
    setStatus("Reading the role…");
    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as TailorResult;
      apply(data);
      setStatus("");
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    reset();
    setStatus("");
  }

  return (
    <section className="section" id="matcher">
      <div className="matcher reveal">
        <div className="matcher-in">
          <span className="matcher-badge">Live model</span>
          <h2 className="display">How do I fit your role?</h2>
          <p className="matcher-lede">
            Paste a job description. This page re-reads my record against it and re-orders what matters — structured output, no fabrication, only re-emphasis of real work.
          </p>
          <textarea
            className="matcher-input"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here…"
            aria-label="Job description"
          />
          <div className="matcher-row">
            <button className="matcher-btn" onClick={run} disabled={loading}>
              {loading ? "Running…" : "Tailor this page"}
            </button>
            {result && <button className="matcher-reset" onClick={clear}>Reset</button>}
            {status && <span className="matcher-status">{status}</span>}
          </div>

          {result && (
            <div className="matcher-results">
              <div className="match-tag">Tailored for: {result.roleName}</div>
              <div className="match-hl">
                {result.matchHighlights.map((h, i) => <div key={i}>{h}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <button className="tailored-badge" onClick={clear}>
          Tailored: {result.roleName} ×
        </button>
      )}
    </section>
  );
}
