"use client";

import { skills } from "@/lib/content";
import { useTailor } from "./TailorContext";

export function Skills() {
  const { result } = useTailor();

  return (
    <section className="section" id="skills">
      <div className="section-head reveal">
        <span className="eyebrow accent">01 — Capability</span>
        <h2 className="display h2">What I <em>build</em> with</h2>
        <p className="sub">
          The stack behind systems that turn operational data into decisions — data engineering, applied AI, and the production rigor that keeps them running.
        </p>
      </div>
      <div className="skill-grid reveal-c">
        {skills.map((s, i) => {
          const t = result?.skills[i];
          return (
            <div className="skill-card" key={s.code}>
              <span className="skill-num">{s.code}</span>
              <h4>{t?.title ?? s.title}</h4>
              <p>{t?.description ?? s.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
