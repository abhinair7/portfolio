"use client";

import Image from "next/image";
import { profile, heroStats } from "@/lib/content";
import { useTailor } from "./TailorContext";
import { ShaderField } from "./ShaderField";

export function Hero() {
  const { result } = useTailor();
  const tagline = result?.heroTagline ?? profile.tagline;

  return (
    <>
      <header className="hero" id="top">
        <ShaderField />
        <div className="hero-content">
        <span className="eyebrow accent reveal">Forward Deployed Engineer · AI Systems &amp; Solutions</span>
        <h1 className="display h1 reveal">
          I build production systems people <span className="accent-word">trust</span>.
        </h1>
        <p className="lede hero-lede reveal">{tagline}</p>
        <div className="hero-cta reveal">
          <a href="#projects" className="btn btn-primary">View work</a>
          <a href="#contact" className="btn btn-ghost">Get in touch</a>
        </div>

        <div className="hero-panel">
          <div className="portrait reveal">
            <Image src="/photo.jpg" alt={profile.name} width={560} height={700} priority sizes="(max-width: 940px) 100vw, 500px" />
            <div className="ptag">
              <div className="n">{profile.name}</div>
              <div className="r">{profile.discipline}</div>
            </div>
          </div>

          <div className="nowcard reveal">
            <div className="nc-head">
              <span className="eyebrow">Profile</span>
              <span className="nc-dot" title="Open to new roles" />
            </div>
            <dl>
              <div className="nc-row"><dt>Role</dt><dd>{profile.discipline}</dd></div>
              <div className="nc-row"><dt>Exp</dt><dd>{profile.experience}</dd></div>
              <div className="nc-row"><dt>Focus</dt><dd><span className="soft">{profile.focusShort}</span></dd></div>
              <div className="nc-row"><dt>Current</dt><dd>{profile.company}</dd></div>
              <div className="nc-row"><dt>Base</dt><dd>{profile.location}</dd></div>
              <div className="nc-row"><dt>Status</dt><dd>{profile.status}</dd></div>
            </dl>
          </div>
        </div>
        </div>
      </header>

      <section className="stat-band">
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
      </section>
    </>
  );
}
