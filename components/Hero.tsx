"use client";

import { profile, heroStats } from "@/lib/content";
import { useTailor } from "./TailorContext";

export function Hero() {
  const { result } = useTailor();
  const tagline = result?.heroTagline ?? profile.tagline;

  return (
    <>
      <header className="hero cine" id="top">
        <div className="cine-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-cine.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="cine-overlay" />
        <div className="cine-grain" />
        <div className="cine-content">
          <span className="cine-eyebrow reveal">Forward Deployed Engineer · 2022 → Now</span>
          <h1 className="cine-title reveal">
            From the frontend to the <em>frontier of AI</em>.
          </h1>
          <p className="cine-sub reveal">
            I started writing frontends, grew into full-stack, went deep on business analytics —
            and now I engineer production AI systems. This is the path.
          </p>
          <div className="cine-cue reveal">
            <span className="rule" />
            Scroll the story
          </div>
        </div>
      </header>

      <section className="stat-band" id="intro">
        <div className="intro-grid">
          <div className="reveal">
            <span className="eyebrow accent">In brief</span>
            <p className="intro-lede">{tagline}</p>
          </div>
          <div className="stat-grid reveal-c">
            {heroStats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="n">
                  <span className="counter" data-target={s.value}>0</span>
                  {s.suffix && <span className="suf">{s.suffix}</span>}
                </div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
