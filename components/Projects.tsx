"use client";

import { useState, useEffect } from "react";
import { projects, gemGallery } from "@/lib/content";
import { useTailor } from "./TailorContext";

type LightboxItem = { src: string; type: "image" | "video"; poster?: string };

export function Projects() {
  const { result } = useTailor();
  const [box, setBox] = useState<LightboxItem | null>(null);

  const order = result
    ? result.projectOrder.filter((i) => i >= 0 && i < projects.length)
    : projects.map((_, i) => i);
  const list = order.map((i) => projects[i]);

  useEffect(() => {
    if (!box) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBox(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [box]);

  return (
    <section className="section" id="projects">
      <div className="section-head reveal">
        <span className="eyebrow accent">03 — Selected work</span>
        <h2 className="display h2">Things I&apos;ve shipped</h2>
        <p className="sub">
          Each one starts with the problem, who it was for, and the key trade-off. The systems built inside Iwaki America run in production and can&apos;t be linked publicly — architecture and outcomes are described instead.
        </p>
      </div>

      <div className="proj-grid reveal-c">
        {list.map((p) => (
          <article className="proj" key={p.id}>
            {p.poster ? (
              <div className="proj-cover" style={{ cursor: "pointer" }} onClick={() => setBox({ src: p.poster!, type: "image" })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.poster} alt={p.name} />
                <div className="overlay"><span>View screens</span></div>
              </div>
            ) : (
              <div className="proj-cover schematic">
                <div className="proj-glyph">{p.glyph}</div>
              </div>
            )}
            <div className="proj-body">
              <div className="proj-tags">{p.tags.join("  ·  ")}</div>
              <h3>{p.name}</h3>
              <p className="proj-problem">{p.problem}</p>
              <p className="proj-summary">{p.summary}</p>
              <div className="proj-metrics">
                {p.metrics.map((m) => <span key={m}>{m}</span>)}
              </div>
              <div className="proj-foot">
                {p.proprietary ? (
                  <span className="proj-locked">Proprietary — in production</span>
                ) : (
                  <>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener" className="proj-link primary">Live demo →</a>}
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener" className="proj-link ghost">GitHub</a>}
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="gem-gallery reveal">
        <div className="gem-label">G.E.M. — screens</div>
        <div className="gem-strip">
          {gemGallery.map((g) =>
            g.type === "video" ? (
              <div className="gem-thumb" key={g.src} onClick={() => setBox({ src: g.src, type: "video", poster: g.poster })}>
                <video src={g.src} poster={g.poster} autoPlay muted loop playsInline preload="metadata" />
              </div>
            ) : (
              <div className="gem-thumb" key={g.src} onClick={() => setBox({ src: g.src, type: "image" })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} />
              </div>
            )
          )}
        </div>
      </div>

      {box && (
        <div className="lightbox" onClick={() => setBox(null)}>
          {box.type === "video" ? (
            <video src={box.src} poster={box.poster} autoPlay muted loop playsInline controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={box.src} alt="" />
          )}
        </div>
      )}
    </section>
  );
}
